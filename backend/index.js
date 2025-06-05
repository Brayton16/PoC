import inversionesRoutes from './routes/inversionesRoutes.js';
import tokenRoutes from './routes/tokenRoutes.js';
import authRoutes from './routes/authRoutes.js';
import walletRoutes from './routes/walletRoutes.js';
import transaccionesRoutes from './routes/transaccionesRoutes.js';
import userRoutes from './routes/userRoutes.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send('Api is running');
});

app.use('/api/inversiones', inversionesRoutes);
app.use('/api/token', tokenRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/transacciones', transaccionesRoutes);
app.use('/api/usuarios', userRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

