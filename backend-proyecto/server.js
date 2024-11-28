const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const SECRET_KEY = "accesoprivado"; 




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

// Middleware para procesar JSON en el cuerpo de las peticiones
app.use(express.json());

// Ruta POST para /login
app.post('/login', (req, res) => {
    const { username, password } = req.body; // Extraer usuario y contraseña del cuerpo

    // Datos de ejemplo (puedes reemplazar esto con un sistema de base de datos)
    const usuarios = [
        { username: 'admin', password: '1234' },
        { username: 'usuario1', password: '5678' },
    ];

    // Verificar si el usuario existe y la contraseña es correcta
    const usuarioEncontrado = usuarios.find(
        user => user.username === username && user.password === password
    );

    if (usuarioEncontrado) {
        // Generar el token
        const token = jwt.sign(
            { username: usuarioEncontrado.username }, // Payload del token
            SECRET_KEY,                               // Clave secreta
            { expiresIn: '1h' }                       // Opciones (token expira en 1 hora)
        );

        // Responder con el token
        res.json({ status: 'ok', token });
    } else {
        // Usuario o contraseña incorrectos
        res.status(401).json({ status: 'error', message: 'Credenciales inválidas' });
    }
});

