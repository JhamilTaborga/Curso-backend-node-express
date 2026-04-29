const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const UserService = require('./user.service');
const service = new UserService();
const { config } = require('../config/config');

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if(!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token
    };
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if(!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user.id }
    const token = jwt.sign(payload, config.jwtSecretRecovery, { expiresIn: '15min'});
    const link = `http://myfrontend.com/recovery?token=${token}`;
console.log('Changes object:', { recoveryToken: token })
    await service.update(user.id, { recoveryToken: token });
    const mail = {
      from: `${config.googleMail}`,
      to: `${user.email}`,
      subject: "Email para recuperar contraseña",
      html: `<b>Ingresa a este link => ${link}</b>`,
    }
    const rta = await this.sendMail(mail);
    console.log('Resultado Sequelize (DataValues):', rta.dataValues);
    return rta;
  }

  async sendMail(infoMail) {

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.googleMail,
        pass: config.googlePass
      }
    });

    await transporter.sendMail(infoMail);
    return { message: 'mail sent' };
  }
}

module.exports = AuthService;
