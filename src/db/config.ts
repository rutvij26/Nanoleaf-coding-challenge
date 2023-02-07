import { Dialect, Sequelize } from 'sequelize'

const dbName = process.env.DB_NAME as string ?? "nanoleaf-challenge";
const dbUser = process.env.DB_USER as string ?? "root"
const dbHost = process.env.DB_HOST ?? "localhost"
const dbDriver = process.env.DB_DRIVER as Dialect ?? "mysql"
const dbPassword = process.env.DB_PASSWORD ?? "rutvij26$"

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver
})

export default sequelizeConnection