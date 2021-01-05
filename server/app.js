const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const route = require('./routes/route');
const port = 3000;
const app = express();


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', route);


app.listen(port, () => {
    console.log("server is up...");
});