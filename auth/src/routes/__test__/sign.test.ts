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

it('should fail when a email that does not exist is supplied', async () => {
  
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: '123456'
    })
    .expect(400);

});

it('should fails when an incorrect password is supplied', async () => {
  
  await request(app)
          .post('/api/users/signup')
          .send({
            email: 'test@test.com',
            password: '123456',
            name: 'test name'
          })
          .expect(201);

  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'failpassword'
    })
    .expect(400);

});

it('should respond with a cookie when given valid credential', async () => {
  
  await request(app)
          .post('/api/users/signup')
          .send({
            email: 'test@test.com',
            password: '123456',
            name: 'test name'
          })
          .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: '123456'
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();;

});

it('should clear the cookie session after sign out', async () => {
    await request(app)
          .post('/api/users/signup')
          .send({
            email: 'test@test.com',
            password: '123456',
            name: 'test name'
          })
          .expect(201);

  const response = await request(app)
          .post('/api/users/signout')
          .send({})
          .expect(200);  

  expect(response.get('Set-Cookie')).toEqual(
    ['express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly']
  );
});
