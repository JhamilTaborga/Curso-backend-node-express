const { User, UserSchema } = require('./user.model');
const { Product, ProductSchema } = require('./product.model');
const  { Order, OrderSchema } = require('./order.model');
const  { Category, CategorySchema } = require('./category.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
}

module.exports = setupModels;
