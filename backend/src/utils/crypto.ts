import * as crypto from 'crypto';

// Calcula o hash SHA-256 de um buffer de dados.
export function calculateFileHash(fileBuffer: Buffer): string {
    const hash = crypto.createHash('sha256');
    hash.update(fileBuffer);
    return '0x' + hash.digest('hex');
}