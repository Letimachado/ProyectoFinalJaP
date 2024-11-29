const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const SECRET_KEY = "accesoprivado"; 


app.use(cors());

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

app.use(express.json());

// Endpoint POST
app.post('/login', (req, res) => {
    const { username, password } = req.body; 

    const usuarios = [
        { username: 'adminLeti', password: '1234' },
        { username: 'adminLu', password: '5678' },
        { username: 'adminRo', password: '1011' },
        { username: 'adminMaga', password: '1213' },
    ];

    const usuarioEncontrado = usuarios.find(
        user => user.username === username && user.password === password
    );

    if (usuarioEncontrado) {
        // TOKEN
        const token = jwt.sign(
            { username: usuarioEncontrado.username }, 
            SECRET_KEY,                               
            { expiresIn: '1h' }                       // Expira en 1 hora
        );


        res.json({ status: 'ok', token });
    } else {
   
        res.status(401).json({ status: 'error', message: 'Credenciales inválidas' });
    }
});

