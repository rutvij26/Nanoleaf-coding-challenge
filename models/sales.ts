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
    public dateCreated!: Date;

    //timestamp
    static associate(models: any) {
      // define association here
    }
  }
  Sales.init({
    salesOrdersID: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    dateCreated: {
      type: DataTypes.DATE,
      unique: false,
      allowNull: true
    },
    salesChannel: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    isoCurrency: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    subtotal: {
      type: DataTypes.FLOAT.UNSIGNED,
      unique: false,
      allowNull: true
    },
    discountAmt: {
      type: DataTypes.FLOAT.UNSIGNED,
      unique: false,
      allowNull: true
    },
    shipping: {
      type: DataTypes.FLOAT.UNSIGNED,
      unique: false,
      allowNull: true
    },
    total: {
      type: DataTypes.FLOAT.UNSIGNED,
      unique: false,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Sales',
  });
  return Sales;
};