import { DocumentHandler } from '../../components/documentHandler';

const API_URL = 'http://localhost:3000';

const calculateFileHash = async (file: File): Promise<string> => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return '0x' + hashHex;
}

const getTimestampFormatado = (isoDate: string) => {
  const data = new Date(isoDate);
  return data.toLocaleString('pt-BR');
}

async function handleVerify(arquivo: File): Promise<any> {
  const hash = await calculateFileHash(arquivo);

  const response = await fetch(`${API_URL}/verify/${hash}`, {
    method: 'GET',
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || (response.status === 404 ? 'Documento não encontrado.' : 'Erro desconhecido.'));
  }

  return result; 
}

export default function DocVerificar() {
  return (
    <DocumentHandler
      title="Verificar Autenticidade"
      actionButtonText="Verificar Documento"
      onAction={handleVerify}
      
      // Definindo como renderizar os dados de sucesso
      renderSuccessData={(data: any) => (
        <>
          <p><strong>Hash (SHA-256):</strong> {data.hash}</p>
          <p><strong>Registrado por:</strong> {data.owner}</p>
          <p><strong>Data do Registro:</strong> {getTimestampFormatado(data.timestamp)}</p>
        </>
      )}
    />
  );
}