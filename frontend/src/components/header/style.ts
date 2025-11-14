import { styled } from "styled-components";

export const Container = styled.header`
    display: flex;
    height: 100px;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    background-color: var(--cor-marrom-main);
    color: var(--cor-branca);

    h1 {
        font-family: var(--font-family);
        font-weight: 500;
        font-size: 2rem;
    }
    
    a:hover{
        color: var(--cor-marrom-claro);
    }

    li {
        font-weight: 500;
        font-size: 1.3rem;
        display: inline-block;
        margin: 0 5px;
    }
`;