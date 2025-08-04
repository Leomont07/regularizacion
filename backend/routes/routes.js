import { Router } from 'express';
import admin from 'firebase-admin';

const router = Router();

// Registro
router.post('/register', async (req, res) => {
  try {
    const db = admin.firestore();
    const { name, email, password } = req.body;
    await db.collection('users').doc(email).set({
      name,
      email,
      password,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const db = admin.firestore();
    const { email, password } = req.body;
    const userRef = db.collection('users').doc(email);
    const doc = await userRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const user = doc.data();
    if (user.password !== password) { 
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    res.status(200).json({ email: user.email, name: user.name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener datos para Home
router.get('/items', async (req, res) => {
  try {
    const db = admin.firestore();
    const snapshot = await db.collection('items').get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Crear un item en Home
router.post('/items', async (req, res) => {
  try {
    const db = admin.firestore();
    const { name } = req.body;
    await db.collection('items').add({
      name,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    res.status(201).json({ message: 'Item creado exitosamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;