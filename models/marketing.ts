'use strict';

import { Model } from 'sequelize';

interface MarketAttributes {
  weekNumber: number;
  dateCreated: Date;
  webVisitors: number;
  prClippings: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Marketing extends Model<MarketAttributes> implements MarketAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    public weekNumber!: number;
    public webVisitors!: number;
    public prClippings!: number;

    public dateCreated!: Date;

    static associate(models: any) {
      // define association here
    }
  }
  Marketing.init({
    weekNumber: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false
    },
    webVisitors: DataTypes.INTEGER.UNSIGNED,
    prClippings: DataTypes.INTEGER.UNSIGNED
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Marketing',
  });
  return Marketing;
};