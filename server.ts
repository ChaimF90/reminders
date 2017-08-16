require('dotenv').config();
import * as express from 'express';
import * as bodyParser from 'body-parser';
const app = express();
import  { authRouter } from './authRoutes';
 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/user', authRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server is running on port ${port}`));
