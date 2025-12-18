const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Middleware para entender datos JSON
app.use(express.json());

// Conexión a MongoDB (Asegúrate de que MongoDB esté corriendo en tu PC)
mongoose.connect('mongodb://localhost:27017/inventarioDB')
    .then(() => console.log("Conectado a MongoDB ✅"))
    .catch(err => console.error("Error de conexión:", err));

// Modelo de datos
const Producto = mongoose.model('Producto', { 
    nombre: String, 
    cantidad: Number 
});

// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta API para obtener todos los productos (GET)
app.get('/api/productos', async (req, res) => {
    const lista = await Producto.find();
    res.json(lista);
});

// Ruta API para agregar un nuevo producto (POST)
app.post('/agregar', async (req, res) => {
    try {
        const nuevo = new Producto(req.body);
        await nuevo.save();
        res.send("Producto guardado correctamente");
    } catch (error) {
        res.status(500).send("Error al guardar");
    }
});

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor en: http://localhost:3000");
});
