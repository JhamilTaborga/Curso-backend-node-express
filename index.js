const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 7777;
// Mi IP
const IP = '192.168.1.4';

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, this my server in express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.listen(port, () => {
  console.log('http://' + IP + ':' + port + '/');
});
