const axios = require("axios");

axios.defaults.validateStatus = () => true;

const BASE_URL = "http://localhost:3003";

describe("Test orders feature", () => {
    test("Should fetch all orders", async () => {
        const response = await axios.get(`${BASE_URL}/orders`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
    });

    test("Should fetch a order by ID", async () => {
        const response = await axios.get(`${BASE_URL}/orders/1`);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty("id", 1);
    });

    test("Should return 404 when order is not found", async () => {
        const response = await axios.get(`${BASE_URL}/orders/9999`);
        expect(response.status).toBe(404);
        expect(response.data.message).toBe("Order not found.");
    });
});
