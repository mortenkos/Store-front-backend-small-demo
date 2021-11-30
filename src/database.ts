import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
    PG_HOST,
    PG_DB,
    PG_DB_TEST,
    PG_USER,
    PG_PWD
} = process.env

let client: Pool;

if (process.env.ENV) {
    process.env.ENV = process.env.ENV.trim()
}

switch (process.env.ENV) {
    case 'test':
        client = new Pool({
            host: PG_HOST,
            database: PG_DB_TEST,
            user: PG_USER,
            password: PG_PWD,
        })   
        break;
    case 'dev':
        client = new Pool({
            host: PG_HOST,
            database: PG_DB,
            user: PG_USER,
            password: PG_PWD,
        })    
        break;
    
    default:
        client = new Pool();
        break;
}

export default client;