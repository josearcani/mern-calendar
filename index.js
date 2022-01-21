const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

// create server

const app = express();

// database
dbConnection();

// CORS
app.use(cors());

// static
app.use(express.static('public'));

// read and parse body
app.use(express.json());

//rutas
app.use('/api/auth', require('./routes/auth'));
// TODO auth / crear, login, renew
// TODO CRUD / eventos

// listen request
app.listen(process.env.PORT, () => {
  console.log(`server running at port ${process.env.PORT}`);
})
