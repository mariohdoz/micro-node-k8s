import request from "supertest";
import { app } from "../../server/server";

it('should return a 404 if ticket is not found', async () => {
  
  const response = await request(app)
    .get('/api/ticket/99999')
    .set('Cookie', global.signin());

  expect(response.status).toEqual(404);

});

it('should return the ticket if the ticket is found', async () => {
  
  const title: string = "Titulo";
  const price: number = 20;
  
  const ticket = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title,
      price
    })
    .expect(201);

  const response = await request(app)
    .get(`/api/ticket/${ticket.body.id}`)
    .set('Cookie', global.signin());

  expect(response.status).toEqual(200);
  expect(response.body.title).toBe(title);
  expect(response.body.price).toBe(price);
  expect(response.body.id).toBe(ticket.body.id);

});