const express = require('express');
const server = express();

server.get("/", (req, res) => {
    return res.send('Welcome to Inventory Management application')
});

server.listen(8000, () => {
    console.log('Server is running on  port 8000');
});