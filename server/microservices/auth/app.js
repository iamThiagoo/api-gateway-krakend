const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const mock = {
    user: 'test',
    password: '1234'
};

app.post('/login', async (req, res) => {
    try {
        const { user, password } = req.body;
        if (user !== mock.user || password !== mock.password) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }
        
        const payload = {
            sub: 'user-test',
            user: 'test',
            iat: Math.floor(Date.now() / 1000),
        };

        const token = jwt.sign(payload, privateKey, {
            algorithm: 'HS256',
            expiresIn: '12h',
            header,
        });

        res.json({ token });
    } catch (error) {
        console.error('Erro ao gerar token:', error);
        res.status(500).json({ message: 'Erro ao gerar token.' });
    }
});

app.listen(port, () => {
    console.log(`Auth server: ${port}`);
});