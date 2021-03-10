import request from "supertest";
import { app } from "../../server/server";
import { Ticket } from "../../models/index.models";
import { natsWrapper } from "../../server/nats-wrapper";

it('should has a route handler listening to /api/tickets for post requests', async() => {
  const response = await request(app)
    .post('/api/tickets')
    .send({});

  expect(response.status).not.toEqual(404);
});

it('should can only be accessed if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .send({});

  expect(response.status).toEqual(401);
});

it('should return other than 401 if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it('should returns an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: '',
      price: 20
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      price: 20
    })
    .expect(400);

});

it('should returns an error if an invalid price is provided', async () => {

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'title',
      price: -20
    })
    .expect(400); 

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'title'
    })
    .expect(400);

});

it('should create a ticket with valid inputs', async () => {

  const title: string = "Titulo";
  const price: number = 20;

  let tickets = await Ticket.find({});
  expect(tickets.length ).toEqual(0);
  
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title,
      price
    });

  tickets = await Ticket.find({});
  expect(tickets.length ).toEqual(1); 
  expect(tickets[0].title).toEqual(title);
  expect(tickets[0].price).toEqual(price);
  expect(response.status).toEqual(201);

});

it('should publish an event', async () => {
  
  const title: string = "Titulo";
  const price: number = 20;
  
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title,
      price
    })
    .expect(201);

  
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});