'use strict';

import { Model } from 'sequelize';

interface PackData {
  packType: string;
  components: string;
  Metric_LMM: number;
  Metric_WMM: number;
  Metric_HMM: number;
  Metric_GWG: number;
  Metric_NWG: number;
  Metric_CBM: number;
  Imperial_LIN: number;
  Imperial_WIN: number;
  Imperial_HIN: number;
  Imperial_GWLB: number;
  Imperial_NWLB: number;
  Imperial_CBFT: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class PackData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    public packType!: string;
    public components!: string;
    public Metric_LMM!: number;
    public Metric_WMM!: number;
    public Metric_HMM!: number;
    public Metric_GWG!: number;
    public Metric_NWG!: number;
    public Metric_CBM!: number;
    public Imperial_LIN!: number;
    public Imperial_WIN!: number;
    public Imperial_HIN!: number;
    public Imperial_GWLB!: number;
    public Imperial_NWLB!: number;
    public Imperial_CBFT!: number;

    static associate(models: any) {
      // define association here
      PackData.belongsTo(models.ProductGrid, {
        foreignKey: "productSKU"
      })
    }
  }
  PackData.init({
    packType: DataTypes.STRING,
    components: DataTypes.STRING,
    Metric_LMM: DataTypes.INTEGER(10).UNSIGNED,
    Metric_WMM: DataTypes.INTEGER(10).UNSIGNED,
    Metric_HMM: DataTypes.INTEGER(10).UNSIGNED,
    Metric_GWG: DataTypes.INTEGER(10).UNSIGNED,
    Metric_NWG: DataTypes.INTEGER(10).UNSIGNED,
    Metric_CBM: DataTypes.FLOAT(10).UNSIGNED,
    Imperial_LIN: DataTypes.FLOAT(10).UNSIGNED,
    Imperial_WIN: DataTypes.FLOAT(10).UNSIGNED,
    Imperial_HIN: DataTypes.FLOAT(10).UNSIGNED,
    Imperial_GWLB: DataTypes.FLOAT(10).UNSIGNED,
    Imperial_NWLB: DataTypes.FLOAT(10).UNSIGNED,
    Imperial_CBFT: DataTypes.FLOAT(10).UNSIGNED
  }, {
    sequelize,
    modelName: 'PackData',
  });
  return PackData;
};