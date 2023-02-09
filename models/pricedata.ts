'use strict';

import { Model } from 'sequelize';

interface PriceDataAttributes {
  BOMUSD: number;
  buyCanadaUSD: number;
  buyFranceUSD: number;
  buyHongKongUSD: number;
  CAD: number;
  USD: number;
  HKD: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class PriceData extends Model<PriceDataAttributes> implements PriceDataAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    public BOMUSD!: number;
    public buyCanadaUSD!: number;
    public buyFranceUSD!: number;
    public buyHongKongUSD!: number;
    public CAD!: number;
    public USD!: number;
    public HKD!: number;

    static associate(models: any) {
      // define association here
      PriceData.belongsTo(models.ProductGrid, {
        foreignKey: "productSKU"
      })
    }
  }

  PriceData.init({
    BOMUSD: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      unique: false
    },
    buyCanadaUSD: {
      type: DataTypes.FLOAT(10).UNSIGNED,
      allowNull: true,
      unique: false
    },
    buyFranceUSD: {
      type: DataTypes.FLOAT(10).UNSIGNED,
      allowNull: true,
      unique: false
    },
    buyHongKongUSD: {
      type: DataTypes.FLOAT(10).UNSIGNED,
      allowNull: true,
      unique: false
    },
    CAD: {
      type: DataTypes.FLOAT(10).UNSIGNED,
      allowNull: true,
      unique: false
    },
    USD: {
      type: DataTypes.FLOAT(10).UNSIGNED,
      allowNull: true,
      unique: false
    },
    HKD: {
      type: DataTypes.FLOAT(10).UNSIGNED,
      allowNull: true,
      unique: false
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'PriceData',
  });
  return PriceData;
};