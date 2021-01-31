import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';
import { indexRoutes } from './routes/index.routes';

// Aplicacion
const app = express();

// Variables
app.set('pkg', pkg);

// Middlewares
app.use(morgan('dev'));

// Rutas
app.use(indexRoutes);

export default app;
