'use strict';
import { Model } from 'sequelize';

interface TaxesAttributes {
  salesOrdersID: string;
  tax_name: string;
  tax_amount: number;
  taxType: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Taxes extends Model<TaxesAttributes> implements TaxesAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    public salesOrdersID!: string;
    public tax_name!: string;
    public tax_amount!: number;
    public taxType!: string;

    static associate(models: any) {
      // define association here
      Taxes.belongsTo(models.Sales, {
        foreignKey: 'salesOrdersID'
      })
    }
  }
  Taxes.init({
    salesOrdersID: DataTypes.STRING,
    tax_name: DataTypes.STRING,
    tax_amount: DataTypes.FLOAT(10).UNSIGNED,
    taxType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Taxes',
  });
  return Taxes;
};