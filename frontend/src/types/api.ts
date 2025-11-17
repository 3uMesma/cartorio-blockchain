// Interface para o tipo de resposta do back-end
export interface UploadSuccessData {
  hash: string;
  owner: string;
  transactionHash: string;
}

// Interface para o estado do upload
export interface UploadStatus {
  type: 'success' | 'error' | 'loading';
  message: string;
  data?: UploadSuccessData;
}

export interface VerifySuccessData {
  hash: string;
  isRegistered: boolean;
  owner: string;
  timestamp: string;
}

export interface VerifyStatus {
  type: 'success' | 'error' | 'loading';
  message: string;
  data?: VerifySuccessData;
}