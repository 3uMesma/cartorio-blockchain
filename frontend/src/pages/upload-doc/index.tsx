import React, { useState } from 'react';
import {Container, StatusMessage} from "./style";
import { type UploadStatus, type UploadSuccessData } from '../../types/api';

export function DocRegistrar() {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus | null>(null);

  const API_URL = 'http://localhost:3000';

  // Seleção do Arquivo do Input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(null);
    setArquivo(null);

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (file.type === 'application/pdf') {
        setArquivo(file);
      } else {
        setStatus({ 
          type: 'error', 
          message: 'Erro: Apenas arquivos .pdf são permitidos.' 
        });
        setArquivo(null);
        e.target.value = ''; 
      }

    } else {
      setArquivo(null);
    }
  };

  const handleRemoveFile = () => {
    setArquivo(null);
    setStatus(null);
  };

  // Envia o arquivo para o endpoint Register
  const handleRegister = async () => {
    if (!arquivo) {
      setStatus({ type: 'error', message: 'Nenhum arquivo selecionado.' });
      return;
    }

    setStatus({ type: 'loading', message: 'Registrando... Por favor, aguarde.' });

    const formData = new FormData();
    // A chave 'documento' DEVE ser a mesma que o 'multer' espera no back-end (VERIFICAR ISSO)
    formData.append('documento', arquivo);

    try {
      // Requisição POST
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro desconhecido no servidor.');
      }

      setStatus({
        type: 'success',
        message: 'Documento registrado com sucesso!',
        data: result as UploadSuccessData,
      });

    } catch (err: any) {
      console.error('Erro ao registrar:', err);
      setStatus({
        type: 'error',
        message: err.message || 'Falha ao conectar com o servidor.',
      });
    }
  };

  const isLoading = status?.type === 'loading';

  return (
    <Container>
      <h2>Registrar Novo Documento</h2>

      {!arquivo && (
        <label> 
          <p>Arraste e solte o arquivo (.pdf) aqui ou clique para selecionar</p>
          <input
            type="file"
            onChange={handleFileChange}
            disabled={isLoading}
            accept="application/pdf"
          />
        </label>
      )}

      {/* Mostra info do arquivo se um estiver selecionado */}
      {arquivo && (
        <div className="file-info">
          <span>{arquivo.name}</span>
          <button onClick={handleRemoveFile} disabled={isLoading}>
            Remover
          </button>
        </div>
      )}

      {/* O botão só é renderizado se 'arquivo' (o estado) existir */}
      {arquivo && (
        <button
          className="register-button"
          onClick={handleRegister}
          disabled={!arquivo || isLoading}
        >
          {isLoading ? 'Registrando...' : 'Registrar na Blockchain'}
        </button>
      )}

      {/* Área de Feedback/Status */}
      {status && (
        <StatusMessage type={status.type} className='status-area'>
          <p className='status-title'>{status.message}</p>
          {status.type === 'success' && status.data && (
            <>
              <hr />
              <p><strong>Hash (SHA-256):</strong> {status.data.hash}</p>
              <p><strong>ID da Transação:</strong> {status.data.transactionHash}</p>
              <p><strong>Registrado por:</strong> {status.data.owner}</p>
            </>
          )}
        </StatusMessage>
      )}

    </Container>
  );
}