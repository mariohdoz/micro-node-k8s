import request from "supertest";
import { app } from "../../server/server";

it('should return a 201 on successfull singup', async () => {
  
  return request(app)
          .post('/api/users/signup')
          .send({
            email: 'test@test.com',
            password: '123456',
            name: 'test name'
          })
          .expect(201);
});

it('should return a 400 with an invalid email', async () => {
  
  return request(app)
          .post('/api/users/signup')
          .send({
            email: 'test',
            password: '123456',
            name: 'test'
          })
          .expect(400);

});

it('should return a 400 with an invalid password', async () => {
  
  return request(app)
          .post('/api/users/signup')
          .send({
            email: 'test@test.com',
            password: '123',
            name: 'test'
          })
          .expect(400);

});

it('should return a 400 with missing email', async () => {
  
  return request(app)
          .post('/api/users/signup')
          .send({
            password: '123456',
            name: 'test'
          })
          .expect(400);

});

it('should return a 400 with missing password', async () => {
  
  return request(app)
          .post('/api/users/signup')
          .send({
            email: 'test@test.com',
            name: 'test'
          })
          .expect(400);

});

it('should return a 400 with missing name', async () => {
  
  return request(app)
          .post('/api/users/signup')
          .send({
            email: 'test@test.com',
            password: '123',
          })
          .expect(400);

});

it('should return a 400 with missing password and email', async () => {
  
  return request(app)
          .post('/api/users/signup')
          .send({})
          .expect(400);

});

it('should disallows duplicate emails', async () => {
  
  await request(app)
          .post('/api/users/signup')
          .send({
            email: 'test@test.com',
            password: '123456',
            name: 'test name'
          })
          .expect(201);

  await request(app)
          .post('/api/users/signup')
          .send({
            email: 'test@test.com',
            password: '123456',
            name: 'test name'
          })
          .expect(400);
   
});

it('should sets a cookie after successful singup', async () => {
  
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '123456',
      name: 'test name'
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();

});