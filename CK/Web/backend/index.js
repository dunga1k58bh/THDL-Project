require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routes = require('./routes/routes')

const app = express()
app.use(cors());

app.use(express.json());
routes(app)
const port = process.env.PORT
app.listen(port, () => console.log('RESTFul API running on :', port));
