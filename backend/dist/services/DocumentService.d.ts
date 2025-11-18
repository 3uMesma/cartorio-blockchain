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
export declare class DocumentService {
    static registerDocument(hash: string): Promise<RegisterResponse>;
    static getDocumentInfo(hash: string): Promise<DocumentInfo>;
}
export {};
//# sourceMappingURL=DocumentService.d.ts.map