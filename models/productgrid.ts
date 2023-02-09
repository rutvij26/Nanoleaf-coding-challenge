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
    barcode: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    parentSku: {
      type: DataTypes.STRING,
      allowNull: true
    },
    regionCode: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    itemType: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    supplier: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    brand: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    variantName: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    shortDesc: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    stocklink: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    lastUpdated: {
      type: DataTypes.DATE,
      unique: false,
      allowNull: true
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'ProductGrid',
  });
  return ProductGrid;
};