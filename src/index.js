const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./controllers/web')(app)

require('./controllers/authController')(app)
require('./controllers/registerController')(app)
require('./controllers/getController')(app)


app.listen(3000);

