const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();

// connect database to MongoDB
const connectDB = require('./server/database/connection')

dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 8080;

app.use(cors());

connectDB();

//parse request to body parser
app.use(bodyparser.json()); // <--- Here
app.use(bodyparser.urlencoded({ extended: true }))

//log request
app.use(morgan('tiny'))

app.use('/', require('./server/routes/router'))

app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) })