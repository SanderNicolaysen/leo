import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import db from './database/db'; 

import testRouter from './routes/test';
import inquiriesRouter from './routes/inquiries';
import faqsRouter from './routes/faqs';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Enable cross domain requests for development in seperate environments
app.use(cors());

app.use('/api/test', testRouter);
app.use('/api/inquiries', inquiriesRouter);
app.use('/api/faqs', faqsRouter);

app.listen('8081');

console.log('Listening on port 8081');

db.setUpDB();

module.exports = app;
