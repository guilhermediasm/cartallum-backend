const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV == 'production') {
    console.log('Production')
} else {
    console.log('Not Production')

    require('dotenv').config();
  
    console.log('process.env.S3_KEY', process.env.S3_KEY)

}


require('./controllers/web')(app)

require('./controllers/authController')(app)
require('./controllers/registerController')(app)
require('./controllers/getController')(app)
require('./controllers/projectController')(app)
require('./controllers/registerInstituicaoController')(app)

app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

