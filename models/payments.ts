'use strict';
import { Model } from 'sequelize';
interface PaymentsAttributes {
  payment_id: number;
  payment_method: string;
  payment_amount: number;
  payment_date: Date;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Payments extends Model<PaymentsAttributes> implements PaymentsAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    public payment_id!: number;
    public payment_method!: string;
    public payment_amount!: number;
    public readonly payment_date!: Date;
    static associate(models: any) {
      // define association here
      Payments.belongsTo(models.Sales, {
        foreignKey: 'salesOrderID'
      })
    }
  }
  Payments.init({
    payment_id: DataTypes.INTEGER(15).UNSIGNED,
    payment_method: DataTypes.STRING,
    payment_amount: DataTypes.FLOAT(10).UNSIGNED,
    payment_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Payments',
  });
  return Payments;
};