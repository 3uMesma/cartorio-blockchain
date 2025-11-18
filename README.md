# "Cartório" com Blockchain

A proposta do projeto é ser uma aplicação web que simula um sistema de registro de documentos digitais utilizando um Smart Contract. O 'Notary' do nome representa justamente isso, a função de um Notário. A ideia do projeto é modernizar os sistemas atuais de cartórios através da tecnologia Blockchain, pois, a partir dela, pode-se ter mais segurança, rapidez, flexibilidade e confiabilidade. Para simplificar o projeto, assume-se que o documento já foi assinado pelas partes interessadas e não infringe nenhuma lei.

As funções dessa site incluem a submissão de um arquivo na rede Blockchain, na aba 'Subir Documento' e também a verificação da validade de um documento que já esteja na Blockchain, na aba 'Validar Documento'. 

## Tecnologias usadas

### Blockchain (Smart Contract)

* **Linguagem do Smart Contract:** Solidity
* **Ambiente de Desenvolvimento:** Hardhat
* **Interação com Blockchain:** Ethers.js
* **Plugins do Hardhat:** `@nomicfoundation/hardhat-toolbox` e `@nomicfoundation/hardhat-ethers`

### Backend

* **Ambiente de Execução:** Node.js
* **Linguagem Principal:** TypeScript
* **Framework da API:** Express
* **Outros:** `Multer` (upload de arquivos), `CORS` (conunicação back e front) e Módulo `Crypto` (criptografia nativa)

### Frontend

* **Linguagem Principal:** TypeScript
* **Biblioteca de UI:** React
* **Outros:** `Router` (roteamento entre páginas), `Styled Components` (estilização), `Vite` (Build Tool), `API fetch` (requisições HTTP)

## Como compilar o projeto

Para rodar o projeto localmente são necessários alguns passos:

### Passo 1: Rodar o Nó Blockchain
Abra um terminal na raiz da pasta backend. Rode o nó local do Hardhat: 

```bash
npx hardhat node
```

e deixe rodando.

### Passo 2: Rodar o Servidor Backend
Abra um segundo terminal, também na pasta backend. 

(Caso seja a primeira vez rodando o projeto, instale as dependências:)
```bash
npm install
```

Compile o código:
```bash
npx tsc
```

E em seguida rode o servidor:
```bash
node dist/server.js
```

também deixe rodando. 

### Passo 3: Rodar o Frontend
Abra um outro terminal, dessa vez na pasta frontend. 
(Caso seja a primeira vez rodando o projeto, instale as dependências:)
```bash
npm install
```

Rode o servidor:
```bash
npm run dev
```
também deixe rodando. 