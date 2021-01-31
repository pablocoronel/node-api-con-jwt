import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';
import indexRoutes from './routes/index.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/users.routes';
import productRoutes from './routes/products.routes';

// Aplicacion
const app = express();

// Variables
app.set('pkg', pkg);

// Middlewares
app.use(morgan('dev'));

// Rutas
app.use(indexRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use("/products", productRoutes);

export default app;
