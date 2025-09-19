import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import pixRoutes from './/routes/pix';

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());

app.use('/api/pix', pixRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));