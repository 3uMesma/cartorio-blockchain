"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomicfoundation/hardhat-toolbox");
require("dotenv/config");
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "";
const config = {
    solidity: "0.8.20",
    networks: {
        // Rede de teste local
        hardhat: {
            chainId: 31337
        },
        // Rede de teste pública (Sepolia)
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111
        }
    },
    paths: {
        sources: "./src/contrato",
        artifacts: "./artifacts"
    }
};
exports.default = config;
//# sourceMappingURL=hardhat.config.js.map