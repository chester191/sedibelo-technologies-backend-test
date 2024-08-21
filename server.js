const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Helper function to read and write JSON files
const readJsonFile = (filePath) => {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const writeJsonFile = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Endpoint to display unique users
app.get('/uniqueUsers', (req, res) => {
    const filePath = path.join(__dirname, 'uniqueUsers.json');
    const data = readJsonFile(filePath);
    res.json(data);
});

// Endpoint to display ordered users
app.get('/orderedUsers', (req, res) => {
    const filePath = path.join(__dirname, 'uniqueUsers.json');
    let data = readJsonFile(filePath);
    data = data.sort((a, b) => a.name.localeCompare(b.name));
    res.json(data);
});

// Endpoint to add a new user
app.post('/adduser', (req, res) => {
    const filePath = path.join(__dirname, 'uniqueUsers.json');
    const newUser = req.body;
    const data = readJsonFile(filePath);

    // Generate a new ID
    const newId = (data.length + 1).toString();
    newUser.id = newId;

    data.push(newUser);
    writeJsonFile(filePath, data);

    res.status(201).json(newUser);
});

// Endpoint to update a user
app.put('/updateuser/:id', (req, res) => {
    const filePath = path.join(__dirname, 'uniqueUsers.json');
    const userId = req.params.id;
    const updatedUser = req.body;
    const data = readJsonFile(filePath);

    const index = data.findIndex(user => user.id === userId);
    if (index !== -1) {
        data[index] = updatedUser;
        writeJsonFile(filePath, data);
        res.json(updatedUser);
    } else {
        res.status(404).send('User not found');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
