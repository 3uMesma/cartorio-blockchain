import { styled } from "styled-components";

export const Container = styled.div`
    .info-home {
        margin: 0 20vw;
    }

    h1 {
        color: var(--cor-marrom-main);
        font-size: 2rem;
        font-weight: 700;
        margin-top: 4rem;
    }

    .explaining-text {
        color: var(--cor-preta);
        font-size: 1.2rem;
        padding: 1rem 0;
    }

    .disclaimer {
        color: var(--cor-cinza);
        font-size: 1rem;
        margin-bottom: 2rem;
    }

    img {
        width: 100%;
        height: 35vh;
        object-fit: cover;
        object-position: center;
    }

    .ref-img {
        color: var(--cor-cinza);
    }
`;