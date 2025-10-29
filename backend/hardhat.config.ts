import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config"; // Importa o dotenv

// Carrega as variáveis de ambiente
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "";

const config: HardhatUserConfig = {
  solidity: "0.8.20", // Mesma versão do seu contrato
  networks: {
    // Rede de teste local
    hardhat: {
      chainId: 31337
    },
    // Rede de teste pública (ex: Sepolia)
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111
    }
  },
  paths: {
    sources: "./src/contrato", // Onde estão seus contratos .sol
    artifacts: "./artifacts"      // Onde o Hardhat salvará a compilação (ABI)
  }
};

export default config;