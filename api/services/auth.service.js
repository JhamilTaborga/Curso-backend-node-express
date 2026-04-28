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

  async sendMail(email) {
    const user = await service.findByEmail(email);
    if(!user) {
      throw boom.unauthorized();
    }
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
      auth: {
        user: config.googleMail,
        pass: config.googlePass
      }
    });

    try {
      const info = await transporter.sendMail({
        from: `${config.googleMail}`, // sender address
        to: `${user.email}`, // list of recipients
        subject: "Hello, this is another message", // subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // HTML body
      });

      console.log("Message sent: %s", info.messageId);
      return { message: 'mail send' };
    } catch (err) {
      console.error("Error while sending mail:", err);
    }
  }
}

module.exports = AuthService;
