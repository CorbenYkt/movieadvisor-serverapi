
# Movie Advisor API

This repository contains the API for the main website https://corbenykt.github.io/movieadvisor. The API is built using Node.js and Express and handles several requests:

```javascript
app.get('/dolike', LikeController.doLike);
app.post('/likes', LikeController.create);
app.delete('/likes', LikeController.remove);
```
The functionality is straightforward: the frontend is hosted on GitHub, the API is deployed on an AWS EC2 server, and MongoDB is used to save users' favorite movies.

The AWS EC2 server runs on port 443 and uses an SSL certificate. This setup is necessary because GitHub, which hosts the frontend, also uses a certificate. To ensure secure communication, frontend requests to the backend are encrypted.

