import { Router } from 'express';
import multer from 'multer';
import { DocumentController } from '../controllers/DocumentController';

const router = Router();

// Configuração do Multer (Upload em Memória)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Definição das Rotas
router.post('/register', upload.single('documento'), DocumentController.register);
router.get('/verify/:hash', DocumentController.verify);

export default router;