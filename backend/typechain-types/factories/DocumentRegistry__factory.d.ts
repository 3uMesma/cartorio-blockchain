import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type { DocumentRegistry, DocumentRegistryInterface } from "../DocumentRegistry";
type DocumentRegistryConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class DocumentRegistry__factory extends ContractFactory {
    constructor(...args: DocumentRegistryConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<DocumentRegistry & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): DocumentRegistry__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b506105c2806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80632b2805db146100465780639b13197414610078578063d1ff853714610094575b600080fd5b610060600480360381019061005b9190610386565b6100c5565b60405161006f93929190610428565b60405180910390f35b610092600480360381019061008d9190610386565b61011c565b005b6100ae60048036038101906100a99190610386565b610291565b6040516100bc92919061045f565b60405180910390f35b60006020528060005260406000206000915090508060000154908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160149054906101000a900460ff16905083565b6000151560008083815260200190815260200160002060010160149054906101000a900460ff16151514610185576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161017c906104e5565b60405180910390fd5b60405180606001604052804281526020013373ffffffffffffffffffffffffffffffffffffffff168152602001600115158152506000808381526020019081526020016000206000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160010160146101000a81548160ff0219169083151502179055509050503373ffffffffffffffffffffffffffffffffffffffff16817f6569e54c43a697fc61e67763858d5abef16899d2b13215c7c07090aa878b24a8426040516102869190610505565b60405180910390a350565b60008060008084815260200190815260200160002060010160149054906101000a900460ff166102f6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102ed9061056c565b60405180910390fd5b60008084815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166000808581526020019081526020016000206000015491509150915091565b600080fd5b6000819050919050565b61036381610350565b811461036e57600080fd5b50565b6000813590506103808161035a565b92915050565b60006020828403121561039c5761039b61034b565b5b60006103aa84828501610371565b91505092915050565b6000819050919050565b6103c6816103b3565b82525050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006103f7826103cc565b9050919050565b610407816103ec565b82525050565b60008115159050919050565b6104228161040d565b82525050565b600060608201905061043d60008301866103bd565b61044a60208301856103fe565b6104576040830184610419565b949350505050565b600060408201905061047460008301856103fe565b61048160208301846103bd565b9392505050565b600082825260208201905092915050565b7f4572726f3a20446f63756d656e746f206a61207265676973747261646f2e0000600082015250565b60006104cf601e83610488565b91506104da82610499565b602082019050919050565b600060208201905081810360008301526104fe816104c2565b9050919050565b600060208201905061051a60008301846103bd565b92915050565b7f4572726f3a20446f63756d656e746f206e616f20656e636f6e747261646f2e00600082015250565b6000610556601f83610488565b915061056182610520565b602082019050919050565b6000602082019050818103600083015261058581610549565b905091905056fea2646970667358221220a4bdd1c673695e3083b22cbff6e883b38ffc15d718ff9136e9c832ab80e8f90564736f6c63430008140033";
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "_hash";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "_owner";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "_timestamp";
            readonly type: "uint256";
        }];
        readonly name: "DocumentRegistered";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "_hash";
            readonly type: "bytes32";
        }];
        readonly name: "GetDocumentInfo";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "timestamp";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly name: "documents";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "timestamp";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly internalType: "bool";
            readonly name: "exists";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "_hash";
            readonly type: "bytes32";
        }];
        readonly name: "registerDocument";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): DocumentRegistryInterface;
    static connect(address: string, runner?: ContractRunner | null): DocumentRegistry;
}
export {};
//# sourceMappingURL=DocumentRegistry__factory.d.ts.map