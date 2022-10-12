const boom = require('@hapi/boom');
const Model = require('../data/models/user.model');

class UserService {
  constructor() {}

  async createDB(data) {

    const exists = await Model.findOne({ email: data.email });
    if (exists) {
      throw boom.unauthorized('Ya existe un usuario con ese correo y nombre de usuario');
    }
    const userData = await Model.create(data);
    userData.set("password", undefined, {strict: false});
    return userData;
  }

  async findDB(data) {
    let { limit, filter } = data;
    let UsersDB = await Model.find(filter);
    UsersDB = limit
      ? UsersDB.filter((item, index) => item && index < limit)
      : UsersDB;
    return UsersDB;
  }
  async findOneDB(data) {
    const User = await Model.findOne(data).select('password name role email');
    if (User == undefined || User == null)
      throw boom.notFound('No se encontro catalogo');
    else if (User.length <= 0)
      throw boom.notFound('No se encontro ningún registro');
    return User;
  }

  async updateDB(id, changes) {
    let User = await Model.findOne({
      _id: id,
    });
    let UserOriginal = User;
    User = {
      ...UserOriginal,
      ...changes
    }
    User.save();

    return {
      original: UserOriginal,
      actualizado: User,
    };
  }

  async deleteDB(id) {
    let User = await Model.findOne({
      _id: id,
    });
    const { deletedCount } = await Model.deleteOne({
      _id: id,
    });
    if (deletedCount <= 0)
      throw boom.notFound('El registro seleccionado no existe');
    return User;
  }
}

module.exports = UserService;
