const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 3003;

app.use(express.json());

async function readOrdersFile() {
    try {
        const data = await fs.readFile(path.join(`${__dirname}/data`, 'orders.json'), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erro ao ler arquivo:', error);
        throw error;
    }
}

app.get('/orders', async (req, res) => {
    try {
        const data = await readOrdersFile();
        res.json(data.orders);
    } catch (error) {
        res.status(500).json({ error: 'Error (get orders)' });
    }
});

app.get('/orders/:id', async (req, res) => {
    try {
        const data = await readOrdersFile();
        const order = data.orders.find(o => o.id === parseInt(req.params.id));
        
        if (!order) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }
        
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Error (get order)' });
    }
});

app.listen(port, () => {
    console.log(`Orders server: ${port}`);
});