const jwt = require('jsonwebtoken');

const secret = 'myCat';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3NjEzODA1M30.ljPmb955TNwAEhWcOKU3D8WE_1hbscyBRqgSZgIjs5k';

function verifyToken(token, secret) {
  return jwt.verify(token, secret)
}

const payload = verifyToken(token, secret);
console.log(payload);
