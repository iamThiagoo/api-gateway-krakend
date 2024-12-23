const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const SECRET_KEY = 'test';

app.use(bodyParser.json());

const mock = {
    user: 'test',
    password: '1234'
};

app.post('/login', (req, res) => {
    const { user, password } = req.body;
    if (user === mock.user && password === mock.password) {
        const token = jwt.sign({ email: mock.email }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credencials.' });
    }
});

const checkToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Token not found.' });
    try {
        const decoded = jwt.verify(token.split(' ')[1], SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

app.listen(port, () => {
    console.log(`Auth server: ${port}`);
});