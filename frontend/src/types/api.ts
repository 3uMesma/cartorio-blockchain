// Tipos de Resposta de Sucesso
export interface UploadSuccessData {
  hash: string;
  owner: string;
  transactionHash: string;
}

export interface VerifySuccessData {
  hash: string;
  owner: string;
  timestamp: string;
}

// Tipo de Status Genérico
export type StatusType = 'success' | 'error' | 'loading';

export interface ApiStatus<T> {
  type: StatusType;
  message: string;
  data?: T;
}

// Tipos de Status Específicos
export type UploadStatus = ApiStatus<UploadSuccessData>;
export type VerifyStatus = ApiStatus<VerifySuccessData>;