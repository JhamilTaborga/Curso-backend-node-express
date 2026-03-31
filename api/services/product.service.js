const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const { models } = require('../../libs/sequelize');
const { Category } = require('../db/models/category.model');

class ProductsService {

  constructor() {
    // this.generate();
  }

  async generate() {
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        // id: faker.datatype.uuid(), Este no funciona porque esta deprecated, es recomenddable usar uuid(), como vemos en lo siguiente
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = await models.Product.create(data)
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
    }
    const { limit, offset } = query;
    if ( limit && offset ) {
      options.limit = limit;
      options.offset = offset;
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return(rta);
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { rta: true }
  }
}

module.exports = ProductsService;
