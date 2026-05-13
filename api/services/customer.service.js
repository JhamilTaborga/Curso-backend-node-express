const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../../libs/sequelize');

class CustomerServices {
  constructor() {}

  async create(data) {
    // Esta es una forma declarativa que tenemos de anidar, manualmente, nuestro usuario creado con el customer y poder crear ambas
    // al mismo tiempo, pero sequealize nos ayuda a realizar esta misma acción con menos líneas de código
/*     const newUser = await models.User.create(data.user)
    const newCustomer = await models.Customer.create({
      ...data,
      userId: newUser.id
    });
    return newCustomer; */

    // Código usando Sequelize: Ya que sequealize guarda en memoria los datos que agregamos en customer.model podemos pasarle
    //"data" a este método y lo relacioanará con "user", como también lo tenemos anidado, sequelize lee la información y la anida acá.

    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    }
    const newCustomer = await models.Customer.create(newData, {
      include: ['user']
    });
    //En el siguiente código vemos la forma de eliminar del output el hash que creamos en customer, como está anidado con user debemos hacerlo así:
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async find() {
    const rta= await models.Customer.findAll({
      include: ['user']
    });
    rta.forEach(customer => { delete customer.dataValues.user.dataValues.password })
    return rta;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    delete customer.dataValues.password;
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);
    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { rta: true }
  }
}

module.exports = CustomerServices;
