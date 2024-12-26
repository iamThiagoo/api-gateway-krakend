const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

async function readUsersFile() {
    try {
        const data = await fs.readFile(path.join(`${__dirname}/data`, 'users.json'), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error (readfile): ', error);
        throw error;
    }
}

app.get('/users', async (req, res) => {
    try {
        const data = await readUsersFile();
        res.json(data.users);
    } catch (error) {
        res.status(500).json({ error: 'Error (get users).' });
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const data = await readUsersFile();
        const user = data.users.find(u => u.id === parseInt(req.params.id));
        if (!user) return res.status(404).json({ error: 'User not found.' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error (get user).' });
    }
});

app.post('/users', async (req, res) => {
    try {
        const data = await readUsersFile();

        if (!req.body.name || !req.body.email) {
            return res.status(500).json({ error: 'Missing fields.' });
        }

        const newUser = {
            id: data.users.length + 1,
            ...req.body
        };
        data.users.push(newUser);
        await fs.writeFile(path.join(`${__dirname}/data`, 'users.json'), JSON.stringify(data, null, 2));
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error (create user).' });
    }
});

app.listen(port, () => {
    console.log(`Users server: ${port}`);
});