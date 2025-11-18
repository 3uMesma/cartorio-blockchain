"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentController = void 0;
const ethers_1 = require("ethers");
const DocumentService_1 = require("../services/DocumentService");
const crypto_1 = require("../utils/crypto");
class DocumentController {
    // Endpoint: POST /register
    static async register(req, res) {
        try {
            // Validação Básica
            if (!req.file) {
                res.status(400).send({ error: "Nenhum arquivo enviado." });
                return;
            }
            // Preparação dos Dados
            const hash = (0, crypto_1.calculateFileHash)(req.file.buffer);
            // Chamada do Serviço (Regra de Negócio)
            const result = await DocumentService_1.DocumentService.registerDocument(hash);
            res.status(201).send({
                message: "Documento registrado com sucesso!",
                ...result
            });
        }
        catch (error) {
            console.error("Erro no controller de registro:", error);
            if (error.message === "DOCUMENT_ALREADY_EXISTS") {
                res.status(409).send({ error: "Documento  registrado." });
            }
            else {
                res.status(500).send({ error: "Erro interno ao registrar o documento." });
            }
        }
    }
    // Endpoint: GET /verify/:hash
    static async verify(req, res) {
        try {
            const { hash } = req.params;
            // Validação do Parâmetro
            if (!hash || !ethers_1.ethers.isHexString(hash) || hash.length !== 66) {
                res.status(400).send({ error: "Formato de hash inválido. Deve ser um bytes32 (ex: 0x... com 66 caracteres)." });
                return;
            }
            // Chamada do Serviço
            const result = await DocumentService_1.DocumentService.getDocumentInfo(hash);
            res.status(200).send(result);
        }
        catch (error) {
            console.error("Erro no controller de verificação:", error);
            if (error.message === "DOCUMENT_NOT_FOUND") {
                res.status(404).send({
                    error: "Documento nao encontrado.",
                    hash: req.params.hash,
                    isRegistered: false
                });
            }
            else {
                res.status(500).send({ error: "Erro interno ao verificar o documento." });
            }
        }
    }
}
exports.DocumentController = DocumentController;
//# sourceMappingURL=DocumentController.js.map