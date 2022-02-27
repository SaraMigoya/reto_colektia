'use strict';
const bcryptjs = require("bcryptjs");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usuario.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    mail: DataTypes.STRING,
    image: DataTypes.STRING,
    password: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'usuario',
  });

usuario.saveUser = async (body) =>{
  const salt = bcryptjs.genSaltSync();

  const user = new usuario({
    ...body,
    password: bcryptjs.hashSync(body.password, salt), 
  
  })

  await user.save()

  return user
};
usuario.getAll = async()=>await usuario.findAll();
    
usuario.getUserById = async (id) => await usuario.findByPk(id);

usuario.updateUser = async (id, data) => {
  const salt = bcryptjs.genSaltSync();

  if(data.password){
    data.password = bcryptjs.hashSync( data.password, salt )
  }

  await usuario.update({ ...data } , { where: { id } });
  
};
usuario.getUserByEmail = async (mail) => await usuario.findOne({ where: {mail: mail }});

usuario.delete = async ( id ) => {
  const user = await usuario.findByPk(id);

  user.deletedAt = new Date();

  await user.save();

  return user;
    
  }; 

  return usuario;
};