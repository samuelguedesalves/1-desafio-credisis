import 'reflect-metadata';
import './database';
import express from 'express';

const server = express();

const port = process.env.PORT || 3333;
server.listen(port, () => {
  console.log(`Server is running in port: ${port}\nPress ctrl+c to stop thid process`);
});
