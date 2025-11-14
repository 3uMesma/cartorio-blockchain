import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    :root {
        --cor-marrom-escuro: #51210D;
        --cor-marrom-main: #6E4334;
        --cor-marrom-claro: #B59988;
        --cor-branca: #F2F2F2;
        --cor-preta: #2D2D2D;
        --font-family: 'Nunito', sans-serif;
    }
    * {
        margin: 0;
        padding: 0;
        border: 0;
        box-sizing: border-box;
        font-size: 100%;
        font-family: var(--font-family);
        vertical-align: baseline;
        text-decoration: none;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    #root {
        height: 100vh;
    }

    ul, li {
        list-style: none;
    }

    a {
        color: inherit;
        text-decoration: none;
      }      

    body {
        background-color: var(--cor-branco);
    }

    hr {
        display: block;
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        margin-left: auto;
        margin-right: auto;
        height: 3px;
        width:50%;
        background-color: var(--cor-rosa);
    }
`;