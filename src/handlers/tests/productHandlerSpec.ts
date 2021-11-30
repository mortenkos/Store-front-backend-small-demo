import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
describe('### Test Product endpoint responses ###', () => {
  describe('Test /product endpoint', () => {
    it('gets the /products endpoint with status 200', async () => {
      const response = await request.get('/products');
      expect(response.status).toBe(200);
    });
  });
  describe('Test /product/:id endpoint', () => {
    it('gets the /products/1 endpoint with status 200', async () => {
      const response = await request.get('/products/1');
      expect(response.status).toBe(200);
    });
  });
  describe('Test /product/category/:category endpoint', () => {
    it('gets the /products/category/cat4 endpoint with status 200', async () => {
      const response = await request.get('/products/category/cat4');
      expect(response.status).toBe(200);
    });
  });
  describe('Test /products/top-5 endpoint', () => {
    it('gets the /products/top-5 endpoint with status 200', async () => {
      const response = await request.get('/products/top-5');
      expect(response.status).toBe(200);
    });
  });
})


