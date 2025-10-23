/** 
 * Para compilar: npx tsc generateHash.ts
 * Para executar: node generateHash.js
 */


import * as fs from 'fs';
import * as crypto from 'crypto';

/* Cálculo do Hash SHA-256*/
function getFileHash(filePath: string): string {
    // lê o arquivo como um buffer de dados
    const fileBuffer = fs.readFileSync(filePath);

    // cria um objeto hash e atualiza com o buffer do arquivo
    const hash = crypto.createHash('sha256');
    hash.update(fileBuffer);

    return '0x' + hash.digest('hex');
}

/* Função teste */
try {
    const pdfPath = './edital_teste.pdf'
    const documentHash = getFileHash(pdfPath);

    // prints de teste
    console.log(`Arquivo: ${pdfPath}`);
    console.log(`Hash SHA-256 (bytes32): ${documentHash}`);
    console.log(`Tamanho do hash: ${documentHash.length - 2} caracteres hex (32 bytes)`);
}
catch (e: any) {
    console.error("Erro ao processar o arquivo. Certifique-se que 'documento.pdf' existe.", e.message);
}

export {};