const axios = require('axios');

axios.defaults.validateStatus = () => true;

const BASE_URL = "http://localhost:3000";

describe("Test authentication feature", () => {
    test("Should log user in", async () => {
        try {
            const input = {
                user: 'test',
                password: '1234'
            }
        
            const response = (await axios.post(`${BASE_URL}/login`, input));
            expect(response.status).toBe(200);
            expect(response.data.token).toBeDefined();
        } catch (error) {
            console.log(error);
        }
    })
    
    test("Should't log user in", async () => {
        const input = {
            user: 'test2',
            password: '1234'
        }
    
        const response = (await axios.post(`${BASE_URL}/login`, input));
        expect(response.status).toBe(401);
        expect(response.data.message).toBe('Invalid credencials.');
    })
});