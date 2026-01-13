const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const { logErros, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = process.env.PORT || 7777;

app.use(express.json());

const whiteList = [`http://localhost:${port}`, `http://192.168.1.8:3000`];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors(options));

app.get('/api', (req, res) => {
  res.send('Hello, this my server in express');
});

app.get('/api/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErros);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('mi port' + port);
});

module.exports = app;
