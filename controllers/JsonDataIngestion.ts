import * as fs from 'fs';
import moment from 'moment';
import db from '../models';

const JSONFilePaths: Array<string> = [
    "./data/marketingData.json",
    "./data/productGrid.json",
    "./data/salesOrders.json",
]

let weeklydata: Record<any, any>;
let week_totalnum: number;
let productSKUdata: Record<any, any>;
let productSKU_totalnum: number;
let productSKU_allkeys: Array<string>;
let salesOrdersdata: Record<any, any>;
let salesOrders_totalnum: number;
let salesOrders_allkeys: Array<string>;

const readJSONFile = async (filePath: string): Promise<any> => {
    try {
        const data = await fs.promises.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.log("ReadJSONFile function error : ", error);
        return error;
    }
}

const InsertMarketingData = async () => {
    try {
        await readJSONFile(JSONFilePaths[0]).then((data) => {
            weeklydata = data["marketingData"]
            week_totalnum = Object.keys(weeklydata).length;
        }).then(() => {
            let inputArray: Array<Record<string, any>> = []
            for (let i = 0; i < week_totalnum; i++) {
                var currentweeknum = (i + 1);
                var currentweek = 'week' + currentweeknum.toString();
                const date = moment(weeklydata[currentweek]['dateCreated'], 'YYYY-MM-DD HH:mm:ss').toDate();
                let input = { "weekNumber": (i + 1), "dateCreated": date, "webVisitors": weeklydata[currentweek]['webVisitors'], "prClippings": weeklydata[currentweek]['prClippings'] };
                inputArray.push(input)
            }
            db.Marketing.bulkCreate(inputArray)
        }).then(() => console.log("Insert Market Successful"))
            .then(() => {
                InsertProductGridData();
            }).then(() => {
                InsertSalesData();
            });
    } catch (err) {
        console.log("InsertMarketingData function error : ", err);
        return err;
    }
}

const InsertProductGridData = async () => {
    try {
        await readJSONFile(JSONFilePaths[1]).then((data) => {
            productSKUdata = data["productSKU"]
            productSKU_allkeys = Object.keys(productSKUdata);
            productSKU_totalnum = Object.keys(productSKUdata).length;
        }).then(async () => {
            let inputArray: Array<Record<string, any>> = [];

            productSKU_allkeys.forEach((key: string) => {
                const date = moment(productSKUdata[key]["lastUpdated"], 'YYYY-MM-DD HH:mm:ss').toDate();
                const input = {
                    "productSKU": key,
                    "barcode": productSKUdata[key]["barcode"],
                    "parentSku": productSKUdata[key]["parentSku"],
                    "regionCode": productSKUdata[key]["regionCode"],
                    "itemType": productSKUdata[key]["itemType"],
                    "supplier": productSKUdata[key]["supplier"],
                    "brand": productSKUdata[key]["brand"],
                    "variantName": productSKUdata[key]["variantName"],
                    "shortDesc": productSKUdata[key]["shortDesc"],
                    "stocklink": productSKUdata[key]["stocklink"],
                    "lastUpdated": date
                }
                inputArray.push(input);
            })
            await db.ProductGrid.bulkCreate(inputArray);
        }).then(() => console.log("Insert Product Grid Successful"))
            .then(async () => {
                await InsertPackData();
                await InsertPriceData();
            });
    } catch (err) {
        console.log("InsertProductGridData function error : ", err);
        return err;
    }
}

const InsertSalesData = async () => {
    try {
        await readJSONFile(JSONFilePaths[2]).then((data) => {
            salesOrdersdata = data["salesOrders"]
            salesOrders_allkeys = Object.keys(salesOrdersdata);
            salesOrders_totalnum = Object.keys(salesOrdersdata).length;
        }).then(async () => {
            let inputArray: Array<Record<string, any>> = [];

            salesOrders_allkeys.forEach((key: string) => {
                const date = moment(salesOrdersdata[key]["dateCreated"], 'YYYY-MM-DD HH:mm:ss').toDate();
                const input = {
                    "salesOrdersID": key,
                    "salesChannel": salesOrdersdata[key]["salesChannel"],
                    "isoCurrency": salesOrdersdata[key]["isoCurrency"],
                    "subtotal": salesOrdersdata[key]["subtotal"],
                    "discountAmt": salesOrdersdata[key]["discountAmt"],
                    "shipping": salesOrdersdata[key]["shipping"],
                    "total": salesOrdersdata[key]["total"],
                    "dateCreated": date,
                }
                inputArray.push(input);
            })
            await db.Sales.bulkCreate(inputArray);

        }).then(() => console.log("Insert Sales Successful"))
            .then(async () => {
                await InsertTaxData();
                await InsertFullfillmentsData();
                await InsertPaymentsData();
            }).then(async () => {
                await InsertLineItemsData();
            });
    } catch (err) {
        console.log("InsertSalesData function error : ", err);
        return err;
    }
};

const InsertTaxData = async () => {
    try {
        let inputArray: Array<Record<string, any>> = [];
        for (let i = 0; i < salesOrders_totalnum; i++) {
            let currentsalesOrders = salesOrders_allkeys[i];
            let taxes_totalnum = Object.keys(salesOrdersdata[currentsalesOrders]['taxes']).length;
            let taxes_allkeys = Object.keys(salesOrdersdata[currentsalesOrders]['taxes']);
            for (let j = 0; j < taxes_totalnum; j++) {
                var currenttaxestype = taxes_allkeys[j];
                let input = { "salesOrdersID": currentsalesOrders, "tax_name": currenttaxestype, "tax_amount": salesOrdersdata[currentsalesOrders]['taxes'][currenttaxestype], taxType: salesOrdersdata[currentsalesOrders]['taxType'] };
                inputArray.push(input);
            }
        }
        await db.Taxes.bulkCreate(inputArray).then(() => console.log("Insert Tax Successful"));;
    } catch (err) {
        console.log("InsertTaxData function error : ", err);
        return err;
    }
};

const InsertLineItemsData = async () => {
    try {
        let inputArray: Array<Record<string, any>> = [];
        for (let i = 0; i < salesOrders_totalnum; i++) {
            var currentsalesOrders = salesOrders_allkeys[i];
            var lineItems_totalnum = Object.keys(salesOrdersdata[currentsalesOrders]['lineItems']).length;
            var lineItems_allkeys = Object.keys(salesOrdersdata[currentsalesOrders]['lineItems']);
            for (let j = 0; j < lineItems_totalnum; j++) {
                var currentlineItemstype = lineItems_allkeys[j];
                let input = { "salesOrdersID": currentsalesOrders, "productSKU": currentlineItemstype, "product_num": salesOrdersdata[currentsalesOrders]['lineItems'][currentlineItemstype] };
                inputArray.push(input);
            }
        }
        await db.LineItems.bulkCreate(inputArray).then(() => console.log("Insert LineItems Successful"));;
    } catch (err) {
        console.log("InsertLineItems function error : ", err);
        return err;
    }
};

const InsertPackData = async () => {
    try {
        let inputArray: Array<Record<string, any>> = [];
        for (let i = 0; i < productSKU_totalnum; i++) {
            var currentproductSKU = productSKU_allkeys[i];
            let input = { "productSKU": currentproductSKU, "packType": productSKUdata[currentproductSKU]['packData']['packType'], "components": productSKUdata[currentproductSKU]['packData']['components'], "Metric_LMM": productSKUdata[currentproductSKU]['packData']['Metric']['LMM'], "Metric_WMM": productSKUdata[currentproductSKU]['packData']['Metric']['WMM'], "Metric_HMM": productSKUdata[currentproductSKU]['packData']['Metric']['HMM'], "Metric_GWG": productSKUdata[currentproductSKU]['packData']['Metric']['GWG'], "Metric_NWG": productSKUdata[currentproductSKU]['packData']['Metric']['NWG'], "Metric_CBM": productSKUdata[currentproductSKU]['packData']['Metric']['CBM'], "Imperial_LIN": productSKUdata[currentproductSKU]['packData']['Imperial']['LIN'], "Imperial_WIN": productSKUdata[currentproductSKU]['packData']['Imperial']['WIN'], "Imperial_HIN": productSKUdata[currentproductSKU]['packData']['Imperial']['HIN'], "Imperial_GWLB": productSKUdata[currentproductSKU]['packData']['Imperial']['GWLB'], "Imperial_NWLB": productSKUdata[currentproductSKU]['packData']['Imperial']['NWLB'], "Imperial_CBFT": productSKUdata[currentproductSKU]['packData']['Imperial']['CBFT'] };
            inputArray.push(input);
        }
        await db.PackData.bulkCreate(inputArray).then(() => console.log("Insert PackData Successful"));
    } catch (err) {
        console.log("InsertPackData function error : ", err);
        return err;
    }
};

const InsertPaymentsData = async () => {
    try {
        let inputArray: Array<Record<string, any>> = [];
        salesOrders_allkeys.forEach((key) => {
            (Object.keys(salesOrdersdata[key]["payments"]) ?? []).forEach((key2) => {
                const date = moment(salesOrdersdata[key]["payments"][key2]["payment_date"], 'YYYY-MM-DD HH:mm:ss').toDate();
                const input = {
                    "payment_id": salesOrdersdata[key]["payments"][key2]["payment_id"],
                    "payment_method": salesOrdersdata[key]["payments"][key2]["payment_method"],
                    "payment_amount": salesOrdersdata[key]["payments"][key2]["payment_amount"],
                    "payment_date": date,
                    "salesOrdersID": key
                }
                inputArray.push(input);
            })
        })
        await db.Payments.bulkCreate(inputArray).then(() => console.log('Insert Payments Successful'))
    } catch (error) {
        console.log("InsertPaymentsData function error : ", error);
        return error;
    }
};
const InsertFullfillmentsData = async () => {
    try {
        let inputArray: Array<Record<string, any>> = [];
        salesOrders_allkeys.forEach((key) => {
            (Object.keys(salesOrdersdata[key]["fulfillments"]) ?? []).forEach((key2) => {
                // const date = moment(salesOrdersdata[key]["fulfillments"][key2]["fullfill_date"], 'YYYY-MM-DD HH:mm:ss').toDate();
                const date = moment(salesOrdersdata[key]["fulfillments"][key2]["fullfill_date"]);
                const dateISO = new Date(date.toISOString());
                const input = {
                    "fulfull_id": salesOrdersdata[key]["fulfillments"][key2]["fulfull_id"],
                    "fulfill_loc": salesOrdersdata[key]["fulfillments"][key2]["fulfill_loc"],
                    "fulfill_Reg": salesOrdersdata[key]["fulfillments"][key2]["fulfill_Reg"],
                    "fulfill_delivery": salesOrdersdata[key]["fulfillments"][key2]["fulfill_delivery"],
                    "fulfill_deliveryid": salesOrdersdata[key]["fulfillments"][key2]["fulfill_deliveryid"],
                    "fulfill_date": dateISO,
                    "salesOrdersID": key
                }
                inputArray.push(input);
            })
        })
        await db.Fulfillments.bulkCreate(inputArray).then(() => console.log('Insert Payments Successful'))
    } catch (error) {
        console.log("InsertFullfillmentsData function error : ", error);
        return error;
    }
};

const InsertPriceData = async () => {
    try {
        let inputArray: Array<Record<string, any>> = [];
        for (let i = 0; i < productSKU_totalnum; i++) {
            var currentproductSKU = productSKU_allkeys[i];
            const input = {
                "productSKU": currentproductSKU,
                "BOMUSD": productSKUdata[currentproductSKU]["priceData"]["Buy"]["BOMUSD"],
                "buyCanadaUSD": productSKUdata[currentproductSKU]["priceData"]["Buy"]["buyCanadaUSD"],
                "buyFranceUSD": productSKUdata[currentproductSKU]["priceData"]["Buy"]["buyFranceUSD"],
                "buyHongKongUSD": productSKUdata[currentproductSKU]["priceData"]["Buy"]["buyHongKongUSD"],
                "CAD": productSKUdata[currentproductSKU]["priceData"]["Sell"]["CAD"],
                "USD": productSKUdata[currentproductSKU]["priceData"]["Sell"]["USD"],
                "HKD": productSKUdata[currentproductSKU]["priceData"]["Sell"]["HKD"]
            }
            inputArray.push(input);
        }
        await db.PriceData.bulkCreate(inputArray).then(() => console.log("Insert PackData Successful"));
    } catch (error) {
        console.log("InsertPriceData function error : ", error);
        return error;
    }
}

export const InsertData = async () => {
    try {
        await InsertMarketingData();
        console.log("Data insertion successful");
    } catch (error) {
        console.log("InsertData function error : ", error);
        return error;
    }
}