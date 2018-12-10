'use strict';

import path from 'path';

import express from 'express';
import morgan from 'morgan';

let app = express();

app.use(morgan('dev'));

app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 3000);
