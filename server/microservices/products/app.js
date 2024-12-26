const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 3002;

app.use(express.json());

async function readProductsFile() {
    try {
        const data = await fs.readFile(path.join(`${__dirname}/data`, 'products.json'), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error (readfile): ', error);
        throw error;
    }
}

app.get('/products', async (req, res) => {
    try {
        const data = await readProductsFile();
        res.json(data.products);
    } catch (error) {
        res.status(500).json({ error: 'Error (get products)' });
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const data = await readProductsFile();
        const product = data.products.find(p => p.id === parseInt(req.params.id));
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error (get product)' });
    }
});

app.post('/products', async (req, res) => {
    try {
        const data = await readProductsFile();

        if (!req.body.name || !req.body.price || !req.body.category || !req.body.stock || !req.body.imageUrl) {
            return res.status(500).json({ error: 'Missing fields.' });
        }

        const newProduct = {
            id: data.products.length + 1,
            ...req.body
        };
        
        data.products.push(newProduct);
        await fs.writeFile(path.join(`${__dirname}/data`, 'products.json'), JSON.stringify(data, null, 2));
        
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error (create product)' });
    }
});

app.listen(port, () => {
    console.log(`Products server: ${port}`);
});