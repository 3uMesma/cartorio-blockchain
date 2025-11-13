import express from 'express';
import multer from 'multer';
import { ethers } from 'ethers';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

// Configuração Inicial
const app = express();
const port = 3000;

// Configuração do Multer para upload em memória
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

console.log("Servidor conectado ao nó RPC e pronto para interagir com o contrato.");

// Função Utilitária de Hash

// Calcula o hash SHA-256 de um buffer de dados.
function getFileHash(fileBuffer: Buffer): string {
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
        const tx = await contract.registerDocument!(hash);
        
        // Aguarda a transação ser minerada
        const receipt = await tx.wait();

        // Responde com sucesso
        res.status(201).send({
            message: "Documento registrado com sucesso!",
            hash: hash,
            owner: await wallet.getAddress(), // O 'msg.sender'
            transactionHash: receipt.hash
        });

    } catch (error: any) {
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

    if (!hash || !ethers.isHexString(hash) || hash.length !== 66) {
        return res.status(400).send({ error: "Formato de hash invalido. Deve ser um bytes32 (ex: 0x... com 66 caracteres)." });
    }

    try {
        // Chama a função GetDocumentInfo do contrato
        const [owner, timestamp] = await contract.GetDocumentInfo!(hash);

        // Responde com as informações
        res.status(200).send({
            hash: hash,
            isRegistered: true,
            owner: owner,
            timestamp: new Date(Number(timestamp) * 1000).toISOString()
        });

    } catch (error: any) {
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