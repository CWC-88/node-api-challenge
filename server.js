const express = require('express');

const actionsRouter = require('./data/routers/actionsRouter');
const projectRouter = require('./data/routers/projectRouter');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Server..</h2>`);
});

//custom middleware
function logger(req, res, next) {
  console.log(
    `Method:${req.method} URL:${req.url} Time:[${new Date().toISOString()}]`
  );
  next();
};

server.use(logger);
server.use('/api/posts', postsRouter);
server.use('/api/users', userRouter);

module.exports = server;
