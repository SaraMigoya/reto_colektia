'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  products.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.STRING,
    stock: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'products',
  });

  products.createProduct = async (data) => await products.create(data);

  products.getAll = async () => await products.findAll();

  products.getProductById = async (id) => await products.findOne(id);

  products.updateProduct = async (id, data) => {

    await products.update({ ...data }, { where: { id } });

  };

  products.delete = async (id) => {
    const product = await products.findByPk(id);

    product.deletedAt = new Date();

    await product.save();

    return product;

  };
  return products;
};