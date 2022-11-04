
const boom = require('@hapi/boom');
const Model = require('./../data/models/Storage.model');

class StorageService {
  constructor() {}

  async createDB(data) {
    const model = new Model(data);
    await model.save();
    return data;
  }

  async findDB(data) {
    let { limit, filter } = data;
    let StoragesDB = await Model.find(filter);
    StoragesDB = limit
      ? StoragesDB.filter((item, index) => item && index < limit)
      : StoragesDB;
    return StoragesDB;
  }
  async findOneDB(id) {
    const Storage = await Model.findOne({
      _id: id,
    });
    if (Storage == undefined || Storage == null)
      throw boom.notFound('No se encontro catalogo');
    else if (Storage.length <= 0)
      throw boom.notFound('No se encontro ningún registro');
    return Storage;
  }

  async updateDB(id, changes) {
    let Storage = await Model.findOne({
      _id: id,
    });
    let StorageOriginal = Storage;
    Storage = {
      ...StorageOriginal,
      ...changes
    }
    Storage.save();

    return {
      original: StorageOriginal,
      actualizado: Storage,
    };
  }

  async deleteDB(id) {
    let Storage = await Model.findOne({
      _id: id,
    });
    const { deletedCount } = await Model.deleteOne({
      _id: id,
    });
    if (deletedCount <= 0)
      throw boom.notFound('El registro seleccionado no existe');
    return Storage;
  }
}

module.exports = StorageService;
