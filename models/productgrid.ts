'use strict';

import { Model } from 'sequelize';

interface ProductGridAttributes {
  productSKU: string;
  barcode: string;
  parentSku: string;
  regionCode: string;
  itemType: string;
  supplier: string;
  brand: string;
  variantName: string;
  shortDesc: string;
  stocklink: string;
  lastUpdated: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class ProductGrid extends Model<ProductGridAttributes> implements ProductGridAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    public productSKU!: string;
    public barcode!: string;
    public parentSku!: string;
    public regionCode!: string;
    public itemType!: string;
    public supplier!: string;
    public brand!: string;
    public variantName!: string;
    public shortDesc!: string;
    public stocklink!: string;
    public readonly lastUpdated!: Date;

    static associate(models: any) {
      // define association here
    }
  }
  ProductGrid.init({
    productSKU: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    barcode: DataTypes.STRING,
    parentSku: DataTypes.STRING,
    regionCode: DataTypes.STRING,
    itemType: DataTypes.STRING,
    supplier: DataTypes.STRING,
    brand: DataTypes.STRING,
    variantName: DataTypes.STRING,
    shortDesc: DataTypes.STRING,
    stocklink: DataTypes.STRING,
    lastUpdated: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ProductGrid',
  });
  return ProductGrid;
};