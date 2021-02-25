import request from "supertest";
import { app } from "../../server/server";
import mongoose from "mongoose";

it('should return a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'titulo',
      price: 20
    })
    .expect(404);


});

it('should return a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'titulo',
      price: 20
    })
    .expect(401);

});

it('should return a 401 if the user does not own the ticket', async () => {

  const ticket = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', global.signin())
    .send({
      title: 'titulo',
      price: 20
    });

  const response = await request(app)
    .put(`/api/tickets/${ticket.body.ticket.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'hola',
      price: 25
    })
    .expect(401);

});

it('should return a 400 if the user provides an invalid title or price', async () => {

  const cookie = global.signin();

  const ticket = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({
      title: 'titulo',
      price: 20
    });

  await request(app)
    .put(`/api/tickets/${ticket.body.ticket.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'hola',
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${ticket.body.ticket.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 20
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${ticket.body.ticket.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'asdasd',
      price: -20
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${ticket.body.ticket.id}`)
    .set('Cookie', cookie)
    .send({
      price: 20,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${ticket.body.ticket.id}`)
    .set('Cookie', cookie)
    .send({
      price: '20',
    })
    .expect(400);

});

it('should updates the ticket provided valid inputs', async () => {
  const cookie = global.signin();
  const title = 'titulo actualizado';
  const price = 400;

  const ticket = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({
      title: 'titulo',
      price: 20
    });

  await request(app)
    .put(`/api/tickets/${ticket.body.ticket.id}`)
    .set('Cookie', cookie)
    .send({
      title: title,
      price: price
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${ticket.body.ticket.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);

});