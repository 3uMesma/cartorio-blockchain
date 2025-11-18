"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const DocumentController_1 = require("../controllers/DocumentController");
const router = (0, express_1.Router)();
// Configuração do Multer (Upload em Memória)
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
// Definição das Rotas
router.post('/register', upload.single('documento'), DocumentController_1.DocumentController.register);
router.get('/verify/:hash', DocumentController_1.DocumentController.verify);
exports.default = router;
//# sourceMappingURL=document.routes.js.map