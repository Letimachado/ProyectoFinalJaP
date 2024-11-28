const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());

// Rutas para los JSONs
app.get('/categories', (req, res) => {
    res.sendFile(__dirname + '/data/cats/cat.json');
});

app.get('/catsproducts/:id', (req, res) => {
    const id = req.params.id;
    res.sendFile(__dirname + `/data/cats_products/${id}.json`);
});

app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    res.sendFile(__dirname + `/data/products/${id}.json`);
});

app.get('/products_comments/:id', (req, res) => {
    const id = req.params.id;
    res.sendFile(__dirname + `/data/products_comments/${id}.json`);
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
