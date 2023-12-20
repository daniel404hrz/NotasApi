import express from 'express'
import userRoutes from './routes/users.routes.js'
import cookieParser from 'cookie-parser';
import auth  from './routes/auth.js';
import notesRoutes from './routes/notes.routes.js'
import morgan from 'morgan';
import home from './routes/home.js'
const app = express();


//middlewares

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ''); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


app.use(userRoutes)
app.use(auth)
app.use(notesRoutes)
app.use(home)
export default app;