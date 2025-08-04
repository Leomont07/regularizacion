import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import routes from './routes/routes.js';

dotenv.config();

// Inicializar Firebase Admin
import(process.env.SERVICE_ACCOUNT_PATH, { with: { type: 'json' } }).then((module) => {
  const serviceAccount = module.default;
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  const app = express();
  app.use(cors());
  app.use(express.json());

  // Rutas
  app.use('/api', routes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Error de firestore:', error);
  process.exit(1);
});