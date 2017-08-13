import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import favicon from 'serve-favicon';
import routes from './routes';

const app = express();
app.disable('x-powered-by');

app.use(favicon(path.join(__dirname, 'favicon', 'favicon.ico')));

app.use(logger('dev', {
  skip: () => app.get('env') === 'test',
}));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// Routes
app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

export default app;
