const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const { logErros, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = 7777;
// Mi IP
const IP = '192.168.1.4';

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, this my server in express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErros);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('http://' + IP + ':' + port + '/');
});
