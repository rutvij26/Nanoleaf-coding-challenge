import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface IMarketing {
    id: number;
    weekNumber: number;
    dateCreated: Date;
    webVisitors: number;
    prClippings: number;
}

export interface MarketingInput extends Optional<IMarketing, "id"> { }
export interface MarketingOutput extends Required<IMarketing> { }

class Marketing extends Model<IMarketing, MarketingInput> implements IMarketing {
    public id!: number
    public weekNumber!: number
    public webVisitors!: number
    public prClippings!: number

    //timestamp
    public readonly dateCreated!: Date
}

Marketing.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
    },
    weekNumber: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true
    },
    dateCreated: {
        type: DataTypes.DATE,
    },
    webVisitors: {
        type: DataTypes.INTEGER.UNSIGNED,
    },
    prClippings: {
        type: DataTypes.INTEGER.UNSIGNED,
    },
}, {
    sequelize: sequelizeConnection,
})

export default Marketing;