"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const ethers_1 = require("ethers");
const crypto = __importStar(require("crypto"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
// Configuração Inicial
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = 3000;
// Configuração do Multer para upload em memória
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
// Configuração do Ethers
// Endereço do nó RPC (ex: Hardhat local)
const RPC_URL = process.env.HARDHAT_RPC_URL || "http://127.0.0.1:8545/";
// Chave privada da conta
const PRIVATE_KEY = process.env.PRIVATE_KEY_SERVER || "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // Chave padrão 0 do Hardhat
// Endereço do contrato implantado
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// Carrega o ABI (a "interface" do contrato)
const abiPath = path.resolve(__dirname, '../artifacts/src/contrato/DocRegistry.sol/DocumentRegistry.json');
const abiJson = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
const CONTRACT_ABI = abiJson.abi;
// Conecta ao provedor e à carteira (Signer)
const provider = new ethers_1.ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers_1.ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers_1.ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);
console.log("Servidor conectado ao nó RPC e pronto para interagir com o contrato.");
// Função Utilitária de Hash
// Calcula o hash SHA-256 de um buffer de dados.
function getFileHash(fileBuffer) {
    //
    const hash = crypto.createHash('sha256');
    hash.update(fileBuffer);
    return '0x' + hash.digest('hex');
}
// Endpoints da API
/**
 * Endpoint para registrar um novo documento.
 * Recebe um arquivo via 'multipart/form-data' no campo 'documento'.
 */
app.post('/register', upload.single('documento'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: "Nenhum arquivo enviado." });
    }
    try {
        // Calcula o hash do arquivo recebido (usando a função acima)
        const hash = getFileHash(req.file.buffer);
        // Chama a função registerDocument do Smart Contract
        console.log(`Registrando hash: ${hash}`);
        const tx = await contract.registerDocument(hash);
        // Aguarda a transação ser minerada
        const receipt = await tx.wait();
        // Responde com sucesso
        res.status(201).send({
            message: "Documento registrado com sucesso!",
            hash: hash,
            owner: await wallet.getAddress(), // O 'msg.sender'
            transactionHash: receipt.hash
        });
    }
    catch (error) {
        console.error(error);
        if (error.message.includes("Erro: Documento ja registrado.")) {
            return res.status(409).send({ error: "Documento ja registrado." });
        }
        res.status(500).send({ error: "Erro interno ao registrar o documento." });
    }
});
// Endpoint para verificar um documento.
app.get('/verify/:hash', async (req, res) => {
    const hash = req.params.hash;
    if (!hash || !ethers_1.ethers.isHexString(hash) || hash.length !== 66) {
        return res.status(400).send({ error: "Formato de hash invalido. Deve ser um bytes32 (ex: 0x... com 66 caracteres)." });
    }
    try {
        // Chama a função GetDocumentInfo do contrato
        const [owner, timestamp] = await contract.GetDocumentInfo(hash);
        // Responde com as informações
        res.status(200).send({
            hash: hash,
            isRegistered: true,
            owner: owner,
            timestamp: new Date(Number(timestamp) * 1000).toISOString()
        });
    }
    catch (error) {
        console.error(error);
        if (error.message.includes("Erro: Documento nao encontrado.")) {
            return res.status(404).send({ error: "Documento nao encontrado.", hash: hash, isRegistered: false });
        }
        res.status(500).send({ error: "Erro interno ao verificar o documento." });
    }
});
// Inicia o Servidor
app.listen(port, () => {
    console.log(`Servidor back-end rodando em http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map