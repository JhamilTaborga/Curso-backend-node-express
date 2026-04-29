const jwt = require('jsonwebtoken');

//Con jwtConfig podremos agregar un tiempo de expiración a cada token creado.
const jwtCofig = {
  expiresIn: '1d',
}
// Este "secret" o llave no debe estar en código, debería estar como una variable de entorno.
const secret  = 'myCat'; //Esta es al firma que le daremos a nuestro token, esta llave solo debe estar en Variables de ambiente.
const payload = {
  //El subject es la forma en la que vamos a identificar al usuario.
  sub: 1,
  //El scope puede ser agregado para manejar los permisos.
  // scope: '',
  role: 'customer'
}

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret, jwtCofig);
console.log(token);
