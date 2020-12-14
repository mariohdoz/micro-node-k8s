import request from "supertest";
import { app } from "../../server/server";

it('should return the current user', async () => {

  const email: string = 'test@test.com';

  const authResponse = await request(app)
    .post('/api/users/signup')
    .send({
      email: email,
      password: '123456',
      name: 'test name'
    })
    .expect(201);

  const cookie = authResponse.get('Set-Cookie');

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send({})
    .expect(200);

  expect(response.body.currentUser.email).toEqual(email);
    
});

it('should respond with null if is not authenticated', async () => {
  
  const response = await request(app)
    .get('/api/users/currentuser')
    .send({})
    .expect(200);

  expect(response.body.currentUser).toEqual(null);

});