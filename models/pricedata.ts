'use strict';

import { Model } from 'sequelize';

interface PriceDataAttributes {
  Buy_BOMUSD: number;
  Buy_buyCanadaUSD: number;
  Buy_buyFranceUSD: number;
  Buy_buyHongKongUSD: number;
  Sell_CAD: number;
  Sell_USD: number;
  Sell_HKD: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class PriceData extends Model<PriceDataAttributes> implements PriceDataAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    public Buy_BOMUSD!: number;
    public Buy_buyCanadaUSD!: number;
    public Buy_buyFranceUSD!: number;
    public Buy_buyHongKongUSD!: number;
    public Sell_CAD!: number;
    public Sell_USD!: number;
    public Sell_HKD!: number;

    static associate(models: any) {
      // define association here
      PriceData.belongsTo(models.ProductGrid, {
        foreignKey: "productSKU"
      })
    }
  }

  PriceData.init({
    Buy_BOMUSD: DataTypes.INTEGER(10).UNSIGNED,
    Buy_buyCanadaUSD: DataTypes.FLOAT(10).UNSIGNED,
    Buy_buyFranceUSD: DataTypes.FLOAT(10).UNSIGNED,
    Buy_buyHongKongUSD: DataTypes.FLOAT(10).UNSIGNED,
    Sell_CAD: DataTypes.FLOAT(10).UNSIGNED,
    Sell_USD: DataTypes.FLOAT(10).UNSIGNED,
    Sell_HKD: DataTypes.FLOAT(10).UNSIGNED
  }, {
    sequelize,
    modelName: 'PriceData',
  });
  return PriceData;
};