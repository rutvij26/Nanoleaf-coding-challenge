'use strict';
import { Model } from 'sequelize';

interface FulfillmentsAttributes {
  fulfull_id: number;
  fulfill_loc: string;
  fulfill_Reg: string;
  fulfill_delivery: string;
  fulfill_deliveryid: string;
  fulfill_date: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Fulfillments extends Model<FulfillmentsAttributes> implements FulfillmentsAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    public fulfull_id!: number;
    public fulfill_loc!: string;
    public fulfill_Reg!: string;
    public fulfill_delivery!: string;
    public fulfill_deliveryid!: string;
    public fulfill_date!: string;
    static associate(models: any) {
      // define association here
      Fulfillments.belongsTo(models.Sales, {
        foreignKey: 'salesOrderID'
      })
    }
  }
  Fulfillments.init({
    fulfull_id: DataTypes.INTEGER,
    fulfill_loc: DataTypes.STRING,
    fulfill_Reg: DataTypes.STRING,
    fulfill_delivery: DataTypes.STRING,
    fulfill_deliveryid: DataTypes.STRING,
    fulfill_date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Fulfillments',
  });
  return Fulfillments;
};