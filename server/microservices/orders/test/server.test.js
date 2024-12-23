const axios = require("axios");

const BASE_URL = "http://localhost:3003";

describe("Testando as rotas de /orders", () => {
    beforeAll(async () => {
        startServer();
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    test("Deve retornar todos os pedidos (GET /orders)", async () => {
        const response = await axios.get(`${BASE_URL}/orders`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
    });

    test("Deve retornar um pedido específico por ID (GET /orders/:id)", async () => {
        const response = await axios.get(`${BASE_URL}/orders/1`);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty("id", 1);
    });

    test("Deve retornar erro ao buscar pedido com ID inexistente (GET /orders/:id)", async () => {
        const response = await axios.get(`${BASE_URL}/orders/9999`);
        expect(response.status).toBe(404);
        expect(response.data.error).toBe("Pedido não encontrado");
    });
});
