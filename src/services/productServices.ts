import Client from "../database";

export class ProductServices {
    async getTop5Products(): Promise<{product_id: number, name: string, totalq: number}[]> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT product_id, name, sum(quantity) as totalq FROM products INNER JOIN products_in_order ON
                         products.id = products_in_order.product_id GROUP BY product_id, name ORDER BY totalq DESC`;
            const result = await conn.query(sql);
            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`unable get products and orders: ${err}`);
        }
    }
}