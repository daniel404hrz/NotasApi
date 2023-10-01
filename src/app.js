import express from 'express'
import userRoutes from './routes/users.routes.js'
import cookieParser from 'cookie-parser';
import auth  from './routes/auth.js';
import notesRoutes from './routes/notes.routes.js'
const app = express();

//middlewares
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userRoutes)
app.use(auth)
app.use(notesRoutes)
export default app;