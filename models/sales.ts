'use strict';
import { Model } from 'sequelize';

interface SalesAttributes {
  salesOrdersID: string;
  dateCreated: Date;
  salesChannel: string;
  isoCurrency: string;
  subtotal: number;
  discountAmt: number;
  shipping: number;
  total: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Sales extends Model<SalesAttributes> implements SalesAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    public salesOrdersID!: string;
    public salesChannel!: string;
    public isoCurrency!: string;
    public subtotal!: number;
    public discountAmt!: number;
    public shipping!: number;
    public total!: number;

    //timestamp
    public readonly dateCreated!: Date;
    static associate(models: any) {
      // define association here
    }
  }
  Sales.init({
    salesOrdersID: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    dateCreated: DataTypes.DATE,
    salesChannel: DataTypes.STRING,
    isoCurrency: DataTypes.STRING,
    subtotal: DataTypes.FLOAT.UNSIGNED,
    discountAmt: DataTypes.FLOAT.UNSIGNED,
    shipping: DataTypes.FLOAT.UNSIGNED,
    total: DataTypes.FLOAT.UNSIGNED
  }, {
    sequelize,
    modelName: 'Sales',
  });
  return Sales;
};