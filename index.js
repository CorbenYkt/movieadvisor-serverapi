import express from 'express';
import mongoose from 'mongoose';
import { RegisterValidation, loginValidation, likeCreateValidation } from './validations.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controlles/UserController.js';
import * as LikeController from './controlles/LikeController.js';
import cors from 'cors';
import https from 'https';
import fs from 'fs';

mongoose.connect('mongodb+srv://vool34:wwwwww@movieadvisor.m94cj.mongodb.net/movieadvisor')
  .then(() => {
    console.log('DB Status - Connected')
  })
  .catch((err) => {
    console.log('DB Status - ERROR', err)
  })

const app = express();
app.use(express.json());
app.use(cors());

app.post('/auth/register', RegisterValidation, UserController.Register);
app.get('/likes', LikeController.getAll);
app.get('/dolike', LikeController.doLike);
app.post('/likes', LikeController.create);
app.delete('/likes', LikeController.remove);


const httpsServer = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/corbenykt.ru/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/corbenykt.ru/fullchain.pem'),
}, app);

httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
});