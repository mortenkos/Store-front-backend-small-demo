import { User, UserStore } from '../users';
import dotenv from "dotenv";

dotenv.config()
const currentEnv = process.env.ENV;

const store = new UserStore;

describe("### Users Model ###", () => {
    const testUsers = [
        { 
            id: 1, 
            first_name: 'Morten', 
            last_name: 'Kose', 
            password_hash: '$2b$10$f7rEDhLXPc9n2q1vrFT9Su58CXB2mT696eGCTI2s1shNCp7j.xFZy' 
        },
        { 
            id: 2, 
            first_name: 'John', 
            last_name: 'Doe', 
            password_hash: '$2b$10$4iAgLL6sr6SVq5g5kV3x5O8o7.z.Q4bI/npMwggUWRZ/DrtEFsQgu' 
        },
        { 
            id: 3, 
            first_name: 'Jane', 
            last_name: 'Doe', 
            password_hash: '$2b$10$rDyk005VAg8okjiD5aD1HukeVaLybSzVBvz6nC3k3hJiFom0nvcu.' 
        },
    ]
    describe("Index method", () => {
        it('should have an index method', () => {
            expect(store.index).toBeDefined()
        })
        if (currentEnv === 'test') {
            it('index method should return a list of users', async () => {
                const result = await store.index();
                expect(result).toEqual(testUsers);
            })
        }
    })
    describe("Show method", () => {
        it('should have an show method', () => {
            expect(store.show).toBeDefined()
        })
    
        it('show method should return user with ID 1', async () => {
            const result = await store.show('1');
            expect(result).toEqual(testUsers[0]);
        })
    })

    describe("Create method", () => {
        it('should have an create method', () => {
            expect(store.create).toBeDefined()
        })
    })
    describe("Auth method", () => {
        it('should have an auth method', () => {
            expect(store.authenticate).toBeDefined()
        })
    })
})
