import dotenv from "dotenv";
import Client from "../database";

dotenv.config()

export type Product = {
    id?: number, 
    name: string, 
    price: string, 
    category: string
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);

            conn.release();
            
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get products ${error}`);
        }
    }
    async show(id: string): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)'

            const conn = await Client.connect()
    
            const result = await conn.query(sql, [id])
    
            conn.release()
    
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not get product with id: ${id}. Error: ${err}!`)
        }
    }
    async showByCategory(category: string): Promise<Product[]> {
        try {
            
            const sql = 'SELECT * FROM products WHERE category=$1'

            const conn = await Client.connect()
    
            const result = await conn.query(sql, [category])
    
            conn.release()
    
            return result.rows
        } catch (err) {
            throw new Error(`Could not get product with id: ${category}. Error: ${err}!`)
        }
    }
    async create(product: Product): Promise<Product> {
        if (!product.name || !product.price || !product.category) {          
            throw new Error('No product to add -- missing data')
        }
        try {
            
            const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *'

            const conn = await Client.connect()
            
            const result = await conn.query(sql, [product.name, product.price, product.category])

            conn.release()
    
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not create product: ${product.name ? product.name : 'unknown'}. Error: ${err}!`)
        }
    }
}