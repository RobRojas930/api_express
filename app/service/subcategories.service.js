// eslint-disable-next-line no-unused-vars
const boom = require('@hapi/boom');
const Model = require('../data/models/subcategories.model.js');

class SubCategoryService {
  constructor() {
  }

  async createDB(data) {
    const model = new Model(data);
    model.save();
    return data;
  }

  async findDB(limit, filter) {
    let subcategoriesDB = await Model.find(filter);
    subcategoriesDB = limit
      ? subcategoriesDB.filter((item, index) => item && index < limit)
      : subcategoriesDB;
    if (subcategoriesDB == undefined || subcategoriesDB == null)
      throw boom.notFound('No se encontro catalogo');
    else if (subcategoriesDB.length <= 0)
      throw boom.notFound('No se encontro ningún registro');
    return subcategoriesDB;
  }
  async findByProductId(productId) {
    let subcategoriesDB = await Model.find();
    subcategoriesDB =  subcategoriesDB.filter((item) => item.productId == productId);

    if (subcategoriesDB == undefined || subcategoriesDB == null)
      throw boom.notFound('No se encontro catalogo');
    else if (subcategoriesDB.length <= 0)
      throw boom.notFound('No se encontro ningún registro');
    return subcategoriesDB;
  }

  async findOneDB(id) {
    const SubCategory = await Model.findOne({
      _id: id,
    });
    if (SubCategory == undefined || SubCategory == null)
      throw boom.notFound('No se encontro catalogo');
    else if (SubCategory.length <= 0)
      throw boom.notFound('No se encontro ningún registro');
    return SubCategory;
  }

  async updateDB(id, changes) {
    let SubCategory = await Model.findOne({
      _id: id,
    });
    let SubCategoryOriginal = {
      name: SubCategory.name,
      id: SubCategory.id,
    };
    const { name } = changes;
    SubCategory.name = name;
    SubCategory.save();

    return {
      original: SubCategoryOriginal,
      actualizado: SubCategory,
    };
  }

  async deleteDB(id) {
    let SubCategory = await Model.findOne({
      _id: id,
    });
    const { deletedCount } = await Model.deleteOne({
      _id: id,
    });
    if (deletedCount <= 0)
      throw boom.notFound('El registro seleccionado no existe');
    return SubCategory;
  }
}



module.exports = SubCategoryService;
