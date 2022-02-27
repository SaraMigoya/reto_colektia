'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orders.init({
    paymet_method: DataTypes.STRING,
    total: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'orders',
  });

  orders.createOrder = async (data) => await orders.create(data);

  orders.getAll = async () => await orders.findAll();

  orders.getOrderById = async (id) => await orders.findOne(id);

  orders.updateOrder = async (id, data) => {

    await orders.update({ ...data }, { where: { id } });

  };

  orders.delete = async (id) => {
    const order = await orders.findByPk(id);

    order.deletedAt = new Date();

    await order.save();

    return order;

  };
  return orders;
};

