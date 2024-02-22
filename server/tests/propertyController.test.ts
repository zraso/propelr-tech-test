import request from 'supertest';
import server from '../src/index';

describe('Property Controller', () => {
  test('GET /properties should return 200 with an empty array', async () => {
    const response = await request(server).get('/api/properties');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('GET /api/properties/:id should return 404 if property is not found', async () => {
    const invalidId = 'invalidId';
    const response = await request(server).get(`/api/properties/${invalidId}`);
    
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(undefined);
  });

  test('POST /api/properties should add a new property', async () => {
    const newProperty = {
      address: '123 Main St',
      photo: 'example.jpg',
      price: 100000
    };
    const response = await request(server)
      .post('/api/properties')
      .send(newProperty);
    
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].address).toBe('123 Main St');
    expect(response.body[0].photo).toBe('example.jpg');
    expect(response.body[0].price).toBe(100000);
  });

  test('DELETE /api/properties/:id should return 404 if property is not found', async () => {
    const invalidId = 'invalidId';
    const response = await request(server).delete(`/api/properties/${invalidId}`);
    
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(undefined);
  });
});