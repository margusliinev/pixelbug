import 'express-async-errors';

import cloudinary from 'cloudinary';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

import { globalErrorHandler, notFoundHandler } from './middleware/errorHandlerMiddleware';
import authRoutes from './routes/auth';
import commentsRoutes from './routes/comments';
import projectsRoutes from './routes/projects';
import ticketsRoutes from './routes/tickets';
import usersRoutes from './routes/users';
import { limiter } from './utils/limiter';

dotenv.config();
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
const app = express();

app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(limiter);

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/projects', projectsRoutes);
app.use('/api/v1/tickets', ticketsRoutes);
app.use('/api/v1', commentsRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../client/dist')));
    app.use(express.static(path.resolve(__dirname, '../public')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
    });
}

app.use(notFoundHandler);
app.use(globalErrorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
