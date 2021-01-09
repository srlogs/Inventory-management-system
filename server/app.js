const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const route = require('./routes/route');
const port = 3000;

app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());
app.use(cors());
app.use('/api', route);

app.listen(port, () => {
    console.log("server is up...");
})