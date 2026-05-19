const boom = require('@hapi/boom');
const  { config } = require('../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

//Este es un middleware para un rol en específicio:
function checkAdminRole (req, res, next) {
  const user = req.user;
  if(user.role === 'admin') {
    next();
  } else {
    next(boom.forbidden('Se requiren permisos de administrador.'));
  }
}

//Este es un middleware para validar varios roles:
function checkRoles (...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.forbidden('Se require permisos de administrador.'))
    }
  }
}

module.exports = { checkApiKey, checkAdminRole, checkRoles }
