"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
async function main() {
    // Pega o contrato
    const DocumentRegistry = await hardhat_1.ethers.getContractFactory("DocumentRegistry");
    // Solicita a implantação
    console.log("Implantando DocumentRegistry...");
    const docRegistry = await DocumentRegistry.deploy();
    await docRegistry.waitForDeployment();
    const address = await docRegistry.getAddress();
    console.log(`Contrato DocumentRegistry implantado em: ${address}`);
    // Endereço: 0x5FbDB2315678afecb367f032d93F642f64180aa3
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
//# sourceMappingURL=deploy.js.map