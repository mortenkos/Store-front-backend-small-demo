import { Product, ProductStore } from '../product';
import dotenv from "dotenv";

dotenv.config()
const currentEnv = process.env.ENV;

const store = new ProductStore;

describe("### Product Model ###", () => {
    const testProducts = [
        { 
            id: 1, 
            name: 'Product 1', 
            price: '25.00', 
            category: 'cat1' 
        },
        { 
            id: 2, 
            name: 'Product 2', 
            price: '25.00', 
            category: 'cat2' 
        },
        { 
            id: 3, 
            name: 'Product 3', 
            price: '5.00', 
            category: 'cat1' 
        },
        { 
            id: 4, 
            name: 'Product 4', 
            price: '15.00', 
            category: 'cat3' 
        },
        { 
            id: 5, 
            name: 'Product 5', 
            price: '2.00', 
            category: 'cat4' 
        },
        { 
            id: 6, 
            name: 'Product 6', 
            price: '250.00', 
            category: 'cat1' 
        },
        { 
            id: 7, 
            name: 'Product 7', 
            price: '254.00', 
            category: 'cat4' 
        },
        { 
            id: 8, 
            name: 'Product 8', 
            price: '45.00', 
            category: 'cat4' 
        },
        { 
            id: 9, 
            name: 'Product 9', 
            price: '22.00', 
            category: 'cat3' 
        },
        { 
            id: 10, 
            name: 'Product 10', 
            price: '18.00', 
            category: 'cat3' 
        },
    ]
    describe("Index method", () => {
        it('should have an index method', () => {
            expect(store.index).toBeDefined()
        })
        if (currentEnv === 'test') {
            it('index method should return a list of products', async () => {
                const result = await store.index();
                expect(result).toEqual(testProducts);
            })
        }
    })
    describe("Show method", () => {
        it('should have an show method', () => {
            expect(store.show).toBeDefined()
        })
    
        it('show method should return product with ID 1', async () => {
            const result = await store.show('1');
            expect(result).toEqual(testProducts[0]);
        })
    })

    describe("Create method", () => {
        it('should have an create method', () => {
            expect(store.create).toBeDefined()
        })
        //TODO Figure out how to test the add product with not messing up other tests    
    })
    describe("Show by category method", () => {
        it('should have an showByCategory method', () => {
            expect(store.showByCategory).toBeDefined()
        })
    
        it('showByCategory method should return product with a category cat2', async () => {
            const result = await store.showByCategory('cat2');
            expect(result).toEqual([testProducts[1]]);
        })
    })
})
