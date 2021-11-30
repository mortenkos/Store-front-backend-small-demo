import Client from "../database";

export type Order = {
    product_id: number | string,
    product_name: string,
    quantity: number,
    unit_price: number | string
}

export const getUserActiveOrder = async (uid: string): Promise<Order[]> => {
    try {
        const conn = await Client.connect();
        const sql = `SELECT product_id, pro.name AS product_name, proin.quantity, pro.price AS unit_price FROM products pro INNER JOIN products_in_order proin ON pro.id = proin.product_id INNER JOIN orders ord ON proin.order_id = ord.id WHERE ord.user_id = ($1) AND ord.status = 'active';`
        const result = await conn.query(sql, [uid]);
        conn.release();

        return result.rows;
    } catch (err) {
        throw new Error(`unable get order detail: ${err}`);
    }
}
export const getUserCompletedOrders = async (uid: string): Promise<Order[]> => {
    try {
        const conn = await Client.connect();
        const sql = `SELECT proin.order_id, product_id, pro.name AS product_name, proin.quantity, pro.price AS unit_price FROM products pro INNER JOIN products_in_order proin ON pro.id = proin.product_id INNER JOIN orders ord ON ord.id = proin.order_id where ord.user_id = ($1) AND ord.status = 'complete';`
        const result = await conn.query(sql, [uid]);
        conn.release();
        var filteredResult = result.rows.reduce(function(obj, value) {
            var key = `order_${value.order_id}`;
            if (obj[key] == null) obj[key] = [];
         
            obj[key].push(value);
            return obj;
         }, {});

        return filteredResult;
    } catch (err) {
        throw new Error(`unable get order details: ${err}`);
    }
}