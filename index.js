const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const tree = require('./routes/tree');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/trees', tree);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('fine');
});

const port = process.env.PORT || 3000;

app.listen(port, (error) => {
    if (error) console.log(error);

    console.log(`listing on port ${port}`);
});