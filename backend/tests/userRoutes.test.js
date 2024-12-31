const request = require('supertest');
const { app, initializeDatabase } = require('../server.js');
const http = require('http');

let server;
let serverInstance;

jest.mock('../utils/jwtUtils.js', () => ({
  generateJwtToken: jest.fn(() => 'mocked_jwt_token'),
}));

beforeAll(async () => {
  // Initialize the database
  await initializeDatabase();

  // Create and start the server
  server = http.createServer(app);
  await new Promise((resolve) => {
    serverInstance = server.listen(resolve); // Wait for the server to start
  });
});

afterAll(async () => {
  // Stop the server and close any open connections
  await new Promise((resolve) => serverInstance.close(resolve));
});

describe('User Routes', () => {
  it('POST /api/v1/users/signup - Successful Signup', async () => {
    const res = await request(server)
      .post('/api/v1/users/signup')
      .send({
        email: 'johndoe@example.com',
        username: 'johndoe',
      });

    expect(res.statusCode).toBe(201); // Assuming successful signup returns 201
    expect(res.body.message).toBe('User signed up successfully');
  });

  it('POST /api/v1/users/signup - Missing Fields', async () => {
    const res = await request(server)
      .post('/api/v1/users/signup')
      .send({
        email: '', // Missing required fields
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors[0].msg).toBe('Username is required');
  });

  it('POST /api/v1/users/login - Successful Login', async () => {
    const res = await request(server)
      .post('/api/v1/users/login')
      .send({
        email: 'johndoe@example.com',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('OTP sent to your email. Please use it to log in.');
  });
});