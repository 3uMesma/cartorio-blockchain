import { Request, Response } from 'express';
import { ethers } from 'ethers';
import { DocumentService } from '../services/DocumentService';
import { calculateFileHash } from '../utils/crypto';

export class DocumentController {
    
    // Endpoint: POST /register
    static async register(req: Request, res: Response) {
        try {
            // Validação Básica
            if (!req.file) {
                res.status(400).send({ error: "Nenhum arquivo enviado." });
                return;
            }

            // Preparação dos Dados
            const hash = calculateFileHash(req.file.buffer);

            // Chamada do Serviço (Regra de Negócio)
            const result = await DocumentService.registerDocument(hash);

            res.status(201).send({
                message: "Documento registrado com sucesso!",
                ...result
            });

        } catch (error: any) {
            console.error("Erro no controller de registro:", error);

            if (error.message === "DOCUMENT_ALREADY_EXISTS") {
                res.status(409).send({ error: "Documento  registrado." });
            } else {
                res.status(500).send({ error: "Erro interno ao registrar o documento." });
            }
        }
    }

    // Endpoint: GET /verify/:hash
    static async verify(req: Request, res: Response) {
        try {
            const { hash } = req.params;

            // Validação do Parâmetro
            if (!hash || !ethers.isHexString(hash) || hash.length !== 66) {
                 res.status(400).send({ error: "Formato de hash inválido. Deve ser um bytes32 (ex: 0x... com 66 caracteres)." });
                 return;
            }

            // Chamada do Serviço
            const result = await DocumentService.getDocumentInfo(hash);

            res.status(200).send(result);

        } catch (error: any) {
            console.error("Erro no controller de verificação:", error);

            if (error.message === "DOCUMENT_NOT_FOUND") {
                res.status(404).send({ 
                    error: "Documento nao encontrado.", 
                    hash: req.params.hash, 
                    isRegistered: false 
                });
            } else {
                res.status(500).send({ error: "Erro interno ao verificar o documento." });
            }
        }
    }
}