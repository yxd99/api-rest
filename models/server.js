require('dotenv');
const express = require('express');
const cors = require('cors');
const { connectionDB } = require('../db/config');

class Server {
  constructor() {
    this.port = process.env.PORT;
    this.app = express();
    this.pathAuth = '/api/auth';
    this.pathUser = '/api/user';
    this.connectBD();
    this.middlewares();
    this.routes();
  }

  async connectBD() {
    await connectionDB();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static('public'));
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.pathAuth, require('../routes/auth'));
    this.app.use(this.pathUser, require('../routes/user'));
    this.app.use('*', (req, res) => {
      res.status(404).send('File not found.');
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Project hosted in http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
