import express from 'express';
import morgan from 'morgan';
import indexRoutes from './routes/index.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/users.routes';
import productRoutes from './routes/products.routes';

// Aplicacion
const app = express();

// Variables
// app.set('pkg', pkg);

// Middlewares
app.use(morgan('dev')); //ver en consola los request
app.use(express.json()); // entender json en response

// Rutas
app.use('/', indexRoutes);
app.use('/api/auth', authRoutes);
app.use(userRoutes);
app.use('/api//products', productRoutes);

export default app;
