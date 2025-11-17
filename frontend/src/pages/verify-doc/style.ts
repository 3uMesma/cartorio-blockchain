import { styled } from "styled-components";
import { type UploadStatus } from '../../types/api';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 10vh 20vw;

    h2 {
        color: var(--cor-marrom-main);
        font-size: 2rem;
        text-transform: uppercase;
        margin-bottom: 1rem;
    }

    label, .file-info {
        background-color: rgba(181, 153, 136, 0.5);
        color: var(--cor-marrom-main);
        border-radius: 10px;
        border: 2px solid var(--cor-marrom-main);
        
        font-size: 1.5rem;
        gap: 3rem;
        padding: 5rem 0;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    button {
        background-color: var(--cor-marrom-main);
        color: var(--cor-branca);
        padding: 0.5rem;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: 600;
    }

    button: hover {
        color: var(--cor-marrom-claro);
    }

    .register-button {
        padding: 1rem;
        font-size: 1.3rem;
        text-transform: uppercase;
        margin-top: 2rem;
    }

    .status-area {
        font-size: 1.5rem;
        margin-top: 1.5rem;
    }

    .status-title {
        font-weight: 700;
        color: var(--cor-marrom-main);
        text-transform: uppercase;
    }
`;

export const StatusMessage = styled.div<{ type: UploadStatus['type'] }>`

`;