import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface ISales {
    id: number;
    salesOrdersID: string;
    dateCreated: Date;
    salesChannel: string;
    isoCurrency: string;
    subtotal: number;
    discountAmt: number;
    shipping: number;
    total: number;
}

export interface SalesInput extends Optional<ISales, "id"> { }
export interface SalesOutput extends Required<ISales> { }

class Sales extends Model<ISales, SalesInput> implements ISales {
    public id!: number;
    public salesOrdersID!: string;
    public salesChannel!: string;
    public isoCurrency!: string;
    public subtotal!: number;
    public discountAmt!: number;
    public shipping!: number;
    public total!: number;

    //timestamp
    public readonly dateCreated!: Date;
}

Sales.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
    },
    salesOrdersID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    salesChannel: {
        type: DataTypes.STRING
    },
    isoCurrency: {
        type: DataTypes.STRING
    },
    subtotal: {
        type: DataTypes.NUMBER.UNSIGNED
    },
    discountAmt: {
        type: DataTypes.NUMBER.UNSIGNED
    },
    shipping: {
        type: DataTypes.NUMBER.UNSIGNED
    },
    total: {
        type: DataTypes.NUMBER.UNSIGNED
    },
    dateCreated: {
        type: DataTypes.DATE,
    },
}, {
    sequelize: sequelizeConnection,
})

export default Sales;