import { ethers } from 'ethers';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

// Variáveis de Ambiente
const RPC_URL = process.env.HARDHAT_RPC_URL || "http://127.0.0.1:8545/";
const PRIVATE_KEY = process.env.PRIVATE_KEY_SERVER || "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 

// Carrega o ABI
const abiPath = path.resolve(__dirname, '../../artifacts/src/contrato/DocRegistry.sol/DocumentRegistry.json');
const abiJson = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
const CONTRACT_ABI = abiJson.abi;

// Inicializa Provedor e Wallet
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// Cria a instância do contrato
export const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

export const ownerWallet = wallet;