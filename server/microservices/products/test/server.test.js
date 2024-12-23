import axios from 'axios';

axios.defaults.validateStatus = () => true;

const BASE_URL = 'http://localhost:3002';

describe('Products API', () => {
  let newProduct;

  test('Should fetch all products', async () => {
    const response = await axios.get(`${BASE_URL}/products`);
    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Array);
    expect(response.data.length).toBeGreaterThan(0);
  });

  test('Should fetch a product by ID', async () => {
    const response = await axios.get(`${BASE_URL}/products/1`);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id', 1);
    expect(response.data).toHaveProperty('name', 'Smartphone XYZ');
  });

  test('Should return 404 when product is not found', async () => {
    const response = await axios.get(`${BASE_URL}/products/9999`);
    expect(response.status).toBe(404);
    expect(response.data.error).toBe('Product not found.');
  });

  test('Should create a new product', async () => {
    const productData = {
      name: 'Wireless Headphones',
      price: 199.99,
      category: 'Accessories',
      stock: 50,
      imageUrl: 'https://media.wired.com/photos/66abec9ccb172c2e5de763bf/master/w_960,c_limit/Edifier-Stax-Spirit-S5-Headphones-Offwhite-Background-SOURCE-Amazon.jpg',
    };
    const response = await axios.post(`${BASE_URL}/products`, productData);
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id');
    expect(response.data.name).toBe(productData.name);
    expect(response.data.price).toBe(productData.price);
    newProduct = response.data;
  });

  test('Should not create a product with missing fields', async () => {
    const productData = {
      name: 'Invalid Product', 
      price: 50,
    };
    const response = await axios.post(`${BASE_URL}/products`, productData);
    expect(response.status).toBe(500);
  });

  test('Should fetch newly created product', async () => {
    const response = await axios.get(`${BASE_URL}/products/${newProduct.id}`);
    expect(response.status).toBe(200);
    expect(response.data.name).toBe(newProduct.name);
    expect(response.data.price).toBe(newProduct.price);
  });
});
