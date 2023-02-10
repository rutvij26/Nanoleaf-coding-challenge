import db from '../models';

export const FetchVisitorData = async () => {
    try {
        return await db.Marketing.findAll();
    } catch (err) {
        console.log("Error fetching visitor data : ", err);
        return err;
    }
}

export const FetchFulfillmentsData = async () => {
    try {
        return await db.Fulfillments.findAll();
    } catch (err) {
        console.log("Error fetching visitor data : ", err);
        return err;
    }
}

export const FetchItemsPlacedOverTime = async () => {
    try {

        return await db.LineItems.findAll({
            include: [{
                raw: true,
                model: db.Sales
            }]
        }).then((lineItems: any) => {
            const mappedLine = lineItems.map((line: any) => {
                return {
                    count: line.product_num,
                    dateCreated: line.Sale.dateCreated
                }
            })
            let salesOrdersByDate: any = {};
            mappedLine.forEach((sale: any) => {
                const date = sale.dateCreated.toLocaleDateString();
                if (!salesOrdersByDate[date]) {
                    salesOrdersByDate[date] = 0;
                }
                salesOrdersByDate[date]++;
            });
            return salesOrdersByDate;
        })

    } catch (err) {
        console.log("Error fetching number of items Placed over time data : ", err);
        return err;
    }
}

export const FetchOrderPlacedOverTime = async () => {
    try {
        return await db.Sales.findAll().then((salesData: any) => {
            const orderCountByDate: any = {};
            salesData.forEach((sale: any) => {
                
                const date = sale.dateCreated.toLocaleDateString();
                if (!orderCountByDate[date]) {
                    orderCountByDate[date] = 0;
                }
                orderCountByDate[date]++;
            })
            return orderCountByDate;
        })
    } catch (error) {
        console.log("Error fetching order Placed over time data : ", error);
        return error;

    }
}


export const FetchSalesRevenueOverTime = async () => {
    try {
        return await db.Sales.findAll().then((salesData: any) => {
            return salesData.map((sale: any) => {
                const date = sale.dateCreated.toLocaleDateString()
                return {
                    "dateCreated": date,
                    "total": sale.total
                }
            })
        })
    } catch (error) {
        console.log("Error Fetching Sales Revenue over time data : ", error);
        return error;
    }
}
