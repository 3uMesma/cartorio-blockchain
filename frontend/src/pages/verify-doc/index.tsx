import React, { useState } from 'react';
import {Container, StatusMessage} from "./style";
import { type VerifyStatus } from '../../types/api';

export function DocVerificar() {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [status, setStatus] = useState<VerifyStatus | null>(null);

  const API_URL = 'http://localhost:3000';

  // Calcula o hash SHA-256 de um arquivo no navegador
  const calculateFileHash = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return '0x' + hashHex;
  }

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

  // Calcula o hash e envia para o endpoint /verify
  const handleVerify = async () => {
    if (!arquivo) {
      setStatus({ type: 'error', message: 'Nenhum arquivo selecionado.' });
      return;
    }

    setStatus({ type: 'loading', message: 'Calculando hash e verificando...' });

    try {
      // Calcular o hash no frontend
      const hash = await calculateFileHash(arquivo);
      // console.log('Hash calculado:', hash);

      // Chamar o GET /verify/:hash
      const response = await fetch(`${API_URL}/verify/${hash}`, {
        method: 'GET',
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          setStatus({
            type: 'error',
            message: result.error || 'Documento não encontrado.',
          });
        } else {
          throw new Error(result.error || 'Erro desconhecido no servidor.');
        }
      } else {
        setStatus({
          type: 'success',
          message: 'Documento encontrado e autêntico!',
          data: result as any,
        });
      }

    } catch (err: any) {
      console.error('Erro ao verificar:', err);
      setStatus({
        type: 'error',
        message: err.message || 'Falha ao conectar com o servidor.',
      });
    }
  };

  const isLoading = status?.type === 'loading';

  const getTimestampFormatado = (isoDate: string) => {
    const data = new Date(isoDate);
    return data.toLocaleString('pt-BR');
  }

  return (
    <Container>
      <h2>Verificar Autenticidade</h2>

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
          onClick={handleVerify}
          disabled={isLoading} 
        >
          {isLoading ? 'Verificando...' : 'Verificar Documento'}
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
              <p><strong>Registrado por:</strong> {status.data.owner}</p>
              <p><strong>Data do Registro:</strong> {getTimestampFormatado(status.data.timestamp)}</p>
            </>
          )}
        </StatusMessage>
      )}

    </Container>
  );
}