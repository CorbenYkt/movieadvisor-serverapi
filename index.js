import express from 'express';
import mongoose from 'mongoose';
import { RegisterValidation, loginValidation, likeCreateValidation } from './validations.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controlles/UserController.js';
import * as LikeController from './controlles/LikeController.js';
import cors from 'cors';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

mongoose.connect('mongodb+srv://vool34:wwwwww@movieadvisor.m94cj.mongodb.net/movieadvisor')
  .then(() => {
    console.log('DB OK')
  })
  .catch((err) => {
    console.log('DB ERROR', err)
  })

const app = express();
app.use(express.json());
app.use(cors());

app.post('/auth/register', RegisterValidation, UserController.Register);
app.get('/likes', LikeController.getAll);
app.get('/dolike', LikeController.doLike);
app.post('/likes', LikeController.create);
app.delete('/likes', LikeController.remove);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});