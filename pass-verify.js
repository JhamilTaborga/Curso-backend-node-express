const bcrypt = require('bcrypt');

async function verifyPassword () {
  const myPassword = 'admin 123 .777';
  const hash = '$2b$10$ws1BRGS4VWwjkjlopFUfiuTDHQyQAAeVTuPZE5YxTcwO62H.Y2Q9e';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();
