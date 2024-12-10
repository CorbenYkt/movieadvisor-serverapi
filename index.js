import express from 'express';
import mongoose from 'mongoose';
import * as LikeController from './controlles/LikeController.js';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import https from 'https';
import httpProxy from 'http-proxy';

mongoose.connect('mongodb+srv://vool34:wwwwww@movieadvisor.m94cj.mongodb.net/movieadvisor')
  .then(() => {
    console.log('DB Status - Connected')
  })
  .catch((err) => {
    console.log('DB Status - ERROR', err)
  })

const app = express();
const proxy = httpProxy.createProxyServer({});

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  const host = req.headers.host;
  
  if (host === 'corbenykt.ru') {
    // Обычная обработка для corbenykt.ru
    next();
  } else if (host === 'mern.corbenykt.ru') {
    // Проксирование запросов на порт 4444
    proxy.web(req, res, { target: 'http://localhost:4444' }, (error) => {
      console.error('Proxy Error:', error);
      res.status(502).send('Bad Gateway');
    });
  } else {
    res.status(404).send('Not Found');
  }
});

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