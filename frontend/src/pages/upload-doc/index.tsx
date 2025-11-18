import { type UploadSuccessData } from '../../types/api';
import { DocumentHandler } from '../../components/documentHandler';

const API_URL = 'http://localhost:3000';

async function handleRegister(arquivo: File): Promise<UploadSuccessData> {
  const formData = new FormData();
  formData.append('documento', arquivo);

  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Erro desconhecido no servidor.');
  }

  return result as UploadSuccessData;
}

export default function DocRegistrar() {
  return (
    <DocumentHandler
      title="Registrar Novo Documento"
      actionButtonText="Registrar na Blockchain"
      onAction={handleRegister}
      
      // Definindo como renderizar os dados de sucesso
      renderSuccessData={(data: UploadSuccessData) => (
        <>
          <p><strong>Hash (SHA-256):</strong> {data.hash}</p>
          <p><strong>ID da Transação:</strong> {data.transactionHash}</p>
          <p><strong>Registrado por:</strong> {data.owner}</p>
        </>
      )}
    />
  );
}