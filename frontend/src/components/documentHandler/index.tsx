import React, { useState } from 'react';
import { Container, StatusMessage, type HandlerStatus } from "./style";

interface DocumentHandlerProps {
  title: string; // "Registrar Novo Documento" ou "Verificar Autenticidade"
  actionButtonText: string; // "Registrar" ou "Verificar"
  
  /* Função de ação. Ela recebe o arquivo e retorna uma Promise
  que resolve com o 'data' de sucesso ou é rejeitada com um erro. */
  onAction: (file: File) => Promise<any>; 
  
  /* 'children' será uma função que recebe os dados de sucesso 
  e decide como renderizá-los. */
  renderSuccessData: (data: any) => React.ReactNode;
}

export function DocumentHandler({ 
  title, 
  actionButtonText, 
  onAction, 
  renderSuccessData 
}: DocumentHandlerProps) {
  
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [status, setStatus] = useState<HandlerStatus | null>(null);

  // Lógica de Manipulação de Arquivo
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

  // Lógica de Ação (genérica)
  const handleAction = async () => {
    if (!arquivo) {
      setStatus({ type: 'error', message: 'Nenhum arquivo selecionado.' });
      return;
    }

    setStatus({ type: 'loading', message: 'Processando... Por favor, aguarde.' });

    try {
      // Chama a função 'onAction' que foi passada via props
      const resultData = await onAction(arquivo);
      
      setStatus({
        type: 'success',
        message: 'Operação concluída com sucesso!',
        data: resultData,
      });

    } catch (err: any) {
      console.error('Erro na ação:', err);
      setStatus({
        type: 'error',
        message: err.message || 'Falha ao conectar com o servidor.',
      });
    }
  };

  const isLoading = status?.type === 'loading';

  return (
    <Container>
      {/* Área de Upload Arquivo */}
      <h2>{title}</h2>

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

      {arquivo && (
        <div className="file-info">
          <span>{arquivo.name}</span>
          <button className="remove-button" onClick={handleRemoveFile} disabled={isLoading}>
            Remover
          </button>
        </div>
      )}

      {arquivo && (
        <button
          className="action-button"
          onClick={handleAction}
          disabled={!arquivo || isLoading}
        >
          {isLoading ? 'Processando...' : actionButtonText}
        </button>
      )}

      {/* Área de Status */}
      {status && (
        <StatusMessage type={status.type} className='status-area'>
          <p className='status-title'>{status.message}</p>
          {status.type === 'success' && status.data && (
            <>
              <hr />
              {renderSuccessData(status.data)}
            </>
          )}
        </StatusMessage>
      )}
    </Container>
  );
}