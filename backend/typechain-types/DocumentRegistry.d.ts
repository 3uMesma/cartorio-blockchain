import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "./common";
export interface DocumentRegistryInterface extends Interface {
    getFunction(nameOrSignature: "GetDocumentInfo" | "documents" | "registerDocument"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "DocumentRegistered"): EventFragment;
    encodeFunctionData(functionFragment: "GetDocumentInfo", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "documents", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "registerDocument", values: [BytesLike]): string;
    decodeFunctionResult(functionFragment: "GetDocumentInfo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "documents", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerDocument", data: BytesLike): Result;
}
export declare namespace DocumentRegisteredEvent {
    type InputTuple = [
        _hash: BytesLike,
        _owner: AddressLike,
        _timestamp: BigNumberish
    ];
    type OutputTuple = [_hash: string, _owner: string, _timestamp: bigint];
    interface OutputObject {
        _hash: string;
        _owner: string;
        _timestamp: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface DocumentRegistry extends BaseContract {
    connect(runner?: ContractRunner | null): DocumentRegistry;
    waitForDeployment(): Promise<this>;
    interface: DocumentRegistryInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    GetDocumentInfo: TypedContractMethod<[
        _hash: BytesLike
    ], [
        [string, bigint] & {
            owner: string;
            timestamp: bigint;
        }
    ], "view">;
    documents: TypedContractMethod<[
        arg0: BytesLike
    ], [
        [
            bigint,
            string,
            boolean
        ] & {
            timestamp: bigint;
            owner: string;
            exists: boolean;
        }
    ], "view">;
    registerDocument: TypedContractMethod<[
        _hash: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "GetDocumentInfo"): TypedContractMethod<[
        _hash: BytesLike
    ], [
        [string, bigint] & {
            owner: string;
            timestamp: bigint;
        }
    ], "view">;
    getFunction(nameOrSignature: "documents"): TypedContractMethod<[
        arg0: BytesLike
    ], [
        [
            bigint,
            string,
            boolean
        ] & {
            timestamp: bigint;
            owner: string;
            exists: boolean;
        }
    ], "view">;
    getFunction(nameOrSignature: "registerDocument"): TypedContractMethod<[_hash: BytesLike], [void], "nonpayable">;
    getEvent(key: "DocumentRegistered"): TypedContractEvent<DocumentRegisteredEvent.InputTuple, DocumentRegisteredEvent.OutputTuple, DocumentRegisteredEvent.OutputObject>;
    filters: {
        "DocumentRegistered(bytes32,address,uint256)": TypedContractEvent<DocumentRegisteredEvent.InputTuple, DocumentRegisteredEvent.OutputTuple, DocumentRegisteredEvent.OutputObject>;
        DocumentRegistered: TypedContractEvent<DocumentRegisteredEvent.InputTuple, DocumentRegisteredEvent.OutputTuple, DocumentRegisteredEvent.OutputObject>;
    };
}
//# sourceMappingURL=DocumentRegistry.d.ts.map