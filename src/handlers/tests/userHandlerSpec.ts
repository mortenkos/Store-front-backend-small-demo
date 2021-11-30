import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
let token: string;
describe('### Test User endpoint responses ###', () => {
  beforeAll((done) => {
    request
      .get('/users/auth')
      .send({
        first_name: "Morten", 
        last_name: "Kose", 
        password: "testimiseks"
      })
        .end((err, response) => {
          token = response.body.token;
          
          done();
        })
  })
  describe('Test /users endpoint with auth', () => {
    it('gets the /users endpoint with status 200', async () => {
      await request.get('/users').set('Authorization', `1 ${token}`).expect(200)
    });
    it('gets the /users endpoint with wrong token and results with status 401', async () => {
      await request.get('/users').set('Authorization', `1 ${token}falsetoken`).expect(401)
    });
  });
  describe('Test /users/:id endpoint with auth', () => {
    it('gets the /users/1 endpoint with status 200', async () => {
      await request.get('/users/1').set('Authorization', `1 ${token}`).expect(200)
    });
    it('gets the /users/:id endpoint with wrong token and results with status 401', async () => {
      await request.get('/users/1').set('Authorization', `1 ${token}falsetoken`).expect(401)
    });
  });
  describe('Test /users/auth endpoint', () => {
    it('gets the /users/auth endpoint with status 200', async () => {
      await request.get('/users/auth').send({
        first_name: "Morten", 
        last_name: "Kose", 
        password: "testimiseks"
      }).expect(200)
    });
  });
  describe('Test /users/:id/current-order endpoint', () => {
    it('gets the /users/1/current-order endpoint with status 200', async () => {
      await request.get('/users/1/current-order').set('Authorization', `1 ${token}`).expect(200)
    });
    it('gets the /users/2/current-order endpoint with status 401', async () => {
      await request.get('/users/2/current-order').expect(401)
    });
  });
  describe('Test /users/:id/completed-orders endpoint', () => {
    it('gets the /users/1/completed-orders endpoint with status 200', async () => {
      await request.get('/users/1/completed-orders').set('Authorization', `1 ${token}`).expect(200)
    });
    it('gets the /users/2/completed-orders endpoint with status 401', async () => {
      await request.get('/users/2/completed-orders').expect(401)
    });
  });
})


