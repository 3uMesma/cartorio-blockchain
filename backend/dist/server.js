"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const document_routes_1 = __importDefault(require("./routes/document.routes"));
// Configuração Inicial
const app = (0, express_1.default)();
const port = 3000;
// Middlewares Globais
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rotas da Aplicação
app.use('/', document_routes_1.default);
// Inicia o Servidor
app.listen(port, () => {
    console.log(`Servidor back-end rodando em http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map