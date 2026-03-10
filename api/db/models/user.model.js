const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

// Este schema define la estructura de la tabla
const UserSchema = {
  id: {
    allowNull: false, //Esto se traduce a: quiero o no que este campo sea falso.
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER // type = Qué dato espero? DataTypes.INTEGER = espero un entero.
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at', //field: nos ayuda a renombrar la seccion en sql, en lugar de "createrAt" que está en camelCase lo crea con el nombre que le pasamos en field.
    defaultValue: Sequelize.NOW
  }
}

class User extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User };
