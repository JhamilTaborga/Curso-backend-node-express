const boom = require('@hapi/boom');
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
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    });
    return newCustomer;
  }

  async find() {
    const rta= await models.Customer.findAll({
      include: ['user']
    });
    return rta;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
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
