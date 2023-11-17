const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const bodyparser = require('body-parser');
const auth = require('./middleware/auth.js');
const app = express();

// connect database to MongoDB
const connectDB = require('./server/database/connection');
const passport = require('passport');
const userDb = require('./server/model/user-model');
const LocalStrategy = require('passport-local');

dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 8080;

app.use(cors());

auth();

connectDB();

passport.use(new LocalStrategy(userDb.authenticate()))
passport.serializeUser(userDb.serializeUser())
app.use(require('express-session')({ secret: 'JWT Secret', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

//parse request to body parser
app.use(bodyparser.json()); // <--- Here
app.use(bodyparser.urlencoded({ extended: true }))

//log request
app.use(morgan('tiny'))

app.use('/', require('./server/routes/router'))

app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) })