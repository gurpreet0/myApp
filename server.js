const express      = require('express');
const signup       = require('./signup/signup.js');
const login        = require('./login/login.js');
const app          = express();
app.use(express.json());
app.use('/signup', signup );
app.use('/login', login.login );
app.use('/forgot',login.forgot );
app.listen(3000);