import { Order, getUserActiveOrder, getUserCompletedOrders } from '../order';

const testDataActiveOrder: Order[] = [
    {
        "product_id": '5',
        "product_name": "Product 5",
        "quantity": 4,
        "unit_price": '2.00'
    },
    {
        "product_id": '2',
        "product_name": "Product 2",
        "quantity": 2,
        "unit_price": '25.00'
    },
    {
        "product_id": '4',
        "product_name": "Product 4",
        "quantity": 4,
        "unit_price": '15.00'
    }
]
const testDataCompletedOrders = {
    "order_4": [
        {
            "order_id": "4",
            "product_id": "7",
            "product_name": "Product 7",
            "quantity": 1,
            "unit_price": "254.00"
        },
        {
            "order_id": "4",
            "product_id": "8",
            "product_name": "Product 8",
            "quantity": 2,
            "unit_price": "45.00"
        },
        {
            "order_id": "4",
            "product_id": "2",
            "product_name": "Product 2",
            "quantity": 1,
            "unit_price": "25.00"
        },
        {
            "order_id": "4",
            "product_id": "10",
            "product_name": "Product 10",
            "quantity": 5,
            "unit_price": "18.00"
        }
    ],
    "order_5": [
        {
            "order_id": "5",
            "product_id": "4",
            "product_name": "Product 4",
            "quantity": 2,
            "unit_price": "15.00"
        },
        {
            "order_id": "5",
            "product_id": "7",
            "product_name": "Product 7",
            "quantity": 2,
            "unit_price": "254.00"
        },
        {
            "order_id": "5",
            "product_id": "1",
            "product_name": "Product 1",
            "quantity": 2,
            "unit_price": "25.00"
        },
        {
            "order_id": "5",
            "product_id": "6",
            "product_name": "Product 6",
            "quantity": 1,
            "unit_price": "250.00"
        }
    ]
}
describe('### Test User orders ###', () => {
    describe('Test getUserActiveOrder with auth', () => {
        it('gets the user 1 active order', async () => {
            const result = await getUserActiveOrder('1');
            expect(result).toEqual(testDataActiveOrder);
        });
    });
    describe('Test getUserCompletedOrders with auth', () => {
        it('gets the user 1 completed orders', async () => {
            const result = await getUserCompletedOrders('1');
            expect(result).toEqual((testDataCompletedOrders as unknown) as Order[]);
        });
    });
})