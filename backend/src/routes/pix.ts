import { Router } from 'express';
import { createPixPayment, handleWebhook } from '../controllers/pixController';

const router = Router();

router.post('/', createPixPayment);
router.post('/webhook', handleWebhook);

export default router;  