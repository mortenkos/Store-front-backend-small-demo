import dotenv from "dotenv";
import bcrypt from 'bcrypt';
import Client from "../database";

dotenv.config()
const pepper = process.env.PEPPER;
const saltRounds = process.env.SALT_ROUNDS

export type User = {
    id?: number, 
    first_name: string, 
    last_name: string, 
    password_hash: string
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);

            conn.release();
            
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get users ${error}`);
        }
    }
    async show(id: string): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'

            const conn = await Client.connect()
    
            const result = await conn.query(sql, [id])
    
            conn.release()
    
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not get user with id: ${id ? id : 'undefined'}. Error: ${err}!`)
        }
    }
    async create(user: User): Promise<User> {
        if (!user.first_name || !user.last_name || !user.password_hash) {          
            throw new Error('No user to add -- missing data')
        }
        try {
            
            const sql = 'INSERT INTO users (first_name, last_name, password_hash) VALUES ($1, $2, $3) RETURNING *'
            const hash = bcrypt.hashSync(
                user.password_hash + pepper, 
                parseInt(saltRounds as string)
            );
            const conn = await Client.connect()
            
            const result = await conn.query(sql, [user.first_name, user.last_name, hash])

            conn.release()
    
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not create user: ${user.first_name ? user.first_name : 'unknown'}. Error: ${err}!`)
        }
    }
    async authenticate(first_name: string, last_name:string, password: string): Promise<User | null> {
        const conn = await Client.connect()
        const sql = 'SELECT * FROM users WHERE first_name=($1) AND last_name=($2)';

        const result = await conn.query(sql, [first_name, last_name])
        
        if (result.rows.length) {
            const user = result.rows[0]

            if (bcrypt.compareSync(password+pepper, user.password_hash)) {
                return user
            }
        }

        return null
    }
}