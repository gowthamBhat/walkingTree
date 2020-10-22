const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const tree = require('./routes/tree');
const path = require('path');
const signup = require('./routes/sign-up');
const login = require('./routes/log-in');

// const corsOptions = {

//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 200

// };
// app.use(cors(corsOptions));
app.use(cors());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));



app.use('/trees', tree);
app.use('/signup', signup);
app.use('/login', login);

app.set('view engine', 'ejs');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


mongoose.connect('mongodb://localhost:27017/walkingTree')
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((er) => {
        console.log('error encounterd', err);

    });

process.on('uncaughtException', (e) => {
    console.log("WE GOT AN UNCAUGHT EXCEPTION");
    console.log(e);
    process.exit(1);
});
process.on('unhandledRejection', (e) => {
    console.log("WE GOT AN UNHANDLED PROMISE");
    console.log(e);
    process.exit(1);
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

const port = process.env.PORT || 3000;

app.listen(port, (error) => {
    if (error) console.log('error encounterd while running the server'.error);

    console.log(`listing on port ${port}`);
});

//TODO: JOI validation 
//TODO: login and signup with Jwt and bycrypt
//TODO : DELETE route for trees/list route with user authorisation middleware