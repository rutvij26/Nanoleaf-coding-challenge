'use strict';
import { Model } from 'sequelize';

interface LineItemsAttributes {
  product_num: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class LineItems extends Model<LineItemsAttributes> implements LineItemsAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    public product_num!: number;
    static associate(models: any) {
      // define association here
      LineItems.belongsTo(models.Sales, {
        foreignKey: 'salesOrderID'
      })
      LineItems.belongsTo(models.ProductGrid, {
        foreignKey: 'productSKU'
      })
    }
  }
  LineItems.init({
    product_num: DataTypes.INTEGER(5).UNSIGNED
  }, {
    sequelize,
    modelName: 'LineItems',
  });
  return LineItems;
};