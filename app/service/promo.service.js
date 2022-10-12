const boom = require('@hapi/boom');
const Model = require('../data/models/promo.model');

class PromoService {
  constructor() {}

  async createDB(data) {
    const model = new Model(data);
    await model.save();
    return data;
  }

  async findDB(data) {
    let { limit, filter } = data;
    let PromosDB = await Model.find(filter);
    PromosDB = limit
      ? PromosDB.filter((item, index) => item && index < limit)
      : PromosDB;
    return PromosDB;
  }
  async findOneDB(id) {
    const Promo = await Model.findOne({
      _id: id,
    });
    if (Promo == undefined || Promo == null)
      throw boom.notFound('No se encontro catalogo');
    else if (Promo.length <= 0)
      throw boom.notFound('No se encontro ningún registro');
    return Promo;
  }

  async updateDB(id, changes) {
    let Promo = await Model.findOne({
      _id: id,
    });
    let PromoOriginal = Promo;
    Promo = {
      ...PromoOriginal,
      ...changes
    }
    Promo.save();

    return {
      original: PromoOriginal,
      actualizado: Promo,
    };
  }

  async deleteDB(id) {
    let Promo = await Model.findOne({
      _id: id,
    });
    const { deletedCount } = await Model.deleteOne({
      _id: id,
    });
    if (deletedCount <= 0)
      throw boom.notFound('El registro seleccionado no existe');
    return Promo;
  }
}

module.exports = PromoService;
