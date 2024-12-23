import axios from 'axios';

axios.defaults.validateStatus = () => true;

const BASE_URL = 'http://localhost:3001';

describe('Users API', () => {
  let newUser;

  test('Should fetch all users', async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Array);
    expect(response.data.length).toBeGreaterThan(0);
  });


  test('Should fetch a user by ID', async () => {
    const response = await axios.get(`${BASE_URL}/users/1`);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id', 1);
    expect(response.data).toHaveProperty('name', 'Thiago Ferreira');
  });

  test('Should return 404 when user is not found', async () => {
    const response = await axios.get(`${BASE_URL}/users/9999`);
    expect(response.status).toBe(404);
    expect(response.data.error).toBe('User not found.');
  });

  test('Should create a new user', async () => {
    const userData = {
      name: 'João Pereira',
      email: 'joao.pereira@example.com',
    };

    const response = await axios.post(`${BASE_URL}/users`, userData);
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id');
    expect(response.data.name).toBe(userData.name);
    expect(response.data.email).toBe(userData.email);

    newUser = response.data;
  });

  test('Should not create a user with missing fields', async () => {
    const userData = {
      name: 'Invalid User',
    };
    const response = await axios.post(`${BASE_URL}/users`, userData);
    expect(response.status).toBe(500);
  });

  test('Should fetch newly created user', async () => {
    const response = await axios.get(`${BASE_URL}/users/${newUser.id}`);
    expect(response.status).toBe(200);
    expect(response.data.name).toBe(newUser.name);
    expect(response.data.email).toBe(newUser.email);
  });
});
