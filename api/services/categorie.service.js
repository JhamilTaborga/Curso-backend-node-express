const boom = require('@hapi/boom');

const { models } = require('../../libs/sequelize');

class CategoryServices {
  constructor() {
  }

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const category = await models.Category.findAll();
    return category;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id,{ include: [ 'products' ]});
    if(!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    }
  }

  delete(id) {
    return { id };
  }
}

module.exports = CategoryServices;
