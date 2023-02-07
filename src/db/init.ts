import Marketing from './models/marketing'
import Sales from './models/sales';

const isDev = process.env.NODE_ENV === "development";

const dbInit = () => {
    Marketing.sync({
        alter: isDev
    });
    Sales.sync({
        alter: isDev
    });
}

export default dbInit;