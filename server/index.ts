'use strict';

const path = require('path');

const express = require('express');
const morgan = require('morgan');

let app = express();

app .use(morgan('dev'));

app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 3000);
