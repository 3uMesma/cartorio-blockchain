"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentService = void 0;
const blockchain_1 = require("../config/blockchain");
class DocumentService {
    // Lógica para Registrar
    // Lógica para Registrar
    static async registerDocument(hash) {
        try {
            console.log(`[Blockchain] Tentando registrar hash: ${hash}`);
            // Chama o contrato
            const tx = await blockchain_1.contract.registerDocument(hash);
            const receipt = await tx.wait();
            return {
                hash: hash,
                owner: await blockchain_1.ownerWallet.getAddress(),
                transactionHash: receipt.hash
            };
        }
        catch (error) {
            console.error("[Blockchain Error]", error);
            if (error.message && error.message.includes("Erro: Documento ja registrado.")) {
                throw new Error("DOCUMENT_ALREADY_EXISTS");
            }
            throw new Error("BLOCKCHAIN_ERROR");
        }
    }
    // Lógica para Verificar
    static async getDocumentInfo(hash) {
        try {
            // Chama o contrato
            const [owner, timestamp] = await blockchain_1.contract.GetDocumentInfo(hash);
            return {
                hash: hash,
                isRegistered: true,
                owner: owner,
                // Convertendo BigInt/Unix timestamp para ISO String
                timestamp: new Date(Number(timestamp) * 1000).toISOString()
            };
        }
        catch (error) {
            if (error.message && error.message.includes("Erro: Documento nao encontrado.")) {
                throw new Error("DOCUMENT_NOT_FOUND");
            }
            console.error("[Blockchain Error]", error);
            throw new Error("BLOCKCHAIN_ERROR");
        }
    }
}
exports.DocumentService = DocumentService;
//# sourceMappingURL=DocumentService.js.map