// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// contrato para registrar documentos na blockchain
contract DocumentRegistry {
    struct Document {
        uint256 timestamp;
        address owner;
        bool exists;
    }

    // Livro de registros do cartório
    mapping(bytes32 => Document) public documents;

    // Comunicação com o back-end
    event DocumentRegistered(
        bytes32 indexed _hash, 
        address indexed _owner, 
        uint256 _timestamp
    );

    function registerDocument(bytes32 _hash) public {
        // Verifica se o documento não foi registrado antes
        require(documents[_hash].exists == false, "Erro: Documento ja registrado.");

        // Registra Documento
        documents[_hash] = Document({
            timestamp: block.timestamp,
            owner: mdg.sender, // nessa impelmentação o dono vai ser quem enviou a mensagem/arquivo
            exists: true
        });

        // Emite o evento
        emit DocumentRegistered(_hash, msg.sender, block.timestamp);
    }

    function GetDocumentInfo(bytes32 _hash) 
        public
        view
        returns (address owner, uint256 timestamp)
    {
        require(documents[_hash].exists, "Erro: Documento nao encontrado.");
        return (documents[_hash].owner, documents[_hash].timestamp);
    }
}