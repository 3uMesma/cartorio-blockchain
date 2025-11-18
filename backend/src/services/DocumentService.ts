import { contract, ownerWallet } from '../config/blockchain';

interface DocumentInfo {
    hash: string;
    isRegistered: boolean;
    owner: string;
    timestamp: string;
}

interface RegisterResponse {
    hash: string;
    owner: string;
    transactionHash: string;
}

export class DocumentService {
        // Lógica para Registrar
    // Lógica para Registrar
    static async registerDocument(hash: string): Promise<RegisterResponse> {
        try {
            // [METRICAS] Inicia a contagem do tempo
            const startTime = Date.now();

            console.log(`[Blockchain] Tentando registrar hash: ${hash}`);
            
            // Chama o contrato
            const tx = await contract.registerDocument!(hash);
            const receipt = await tx.wait();

            // [METRICAS] Finaliza contagem e calcula duração
            const endTime = Date.now();
            const durationSeconds = (endTime - startTime) / 1000;

            // [METRICAS] Exibe os dados no console para você copiar para o relatório
            if (receipt) {
                console.log("\n=== DESEMPENHO DA TRANSAÇÃO ===");
                console.log(`Tempo Total: ${durationSeconds.toFixed(2)}s`);
                console.log(`Gás Usado: ${receipt.gasUsed.toString()} unidades`);
            }

            return {
                hash: hash,
                owner: await ownerWallet.getAddress(),
                transactionHash: receipt.hash
            };

        } catch (error: any) {
            console.error("[Blockchain Error]", error);
            if (error.message && error.message.includes("Erro: Documento ja registrado.")) {
                throw new Error("DOCUMENT_ALREADY_EXISTS");
            }
            throw new Error("BLOCKCHAIN_ERROR");
        }
    }

    // Lógica para Verificar
    static async getDocumentInfo(hash: string): Promise<DocumentInfo> {
        try {
            // [METRICAS] Inicia a contagem do tempo
            const startTime = Date.now();

            // Chama o contrato
            const [owner, timestamp] = await contract.GetDocumentInfo!(hash);

            // [METRICAS] Finaliza contagem e calcula duração
            const endTime = Date.now();
            const durationSeconds = (endTime - startTime) / 1000;

            // [METRICAS] Exibe os dados no console para você copiar para o relatório
            console.log("\n=== RELATÓRIO DE CONSULTA (READ) ===");
            console.log(`Tempo de Resposta: ${durationSeconds.toFixed(3)}s`);
            // Esse tipo não tem custo de gás
            console.log("========================================\n");

            return {
                hash: hash,
                isRegistered: true,
                owner: owner,
                // Convertendo BigInt/Unix timestamp para ISO String
                timestamp: new Date(Number(timestamp) * 1000).toISOString()
            };

        } catch (error: any) {
            if (error.message && error.message.includes("Erro: Documento nao encontrado.")) {
                throw new Error("DOCUMENT_NOT_FOUND");
            }
            console.error("[Blockchain Error]", error);
            throw new Error("BLOCKCHAIN_ERROR");
        }
    }
}