const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Librería nativa para manejar rutas de archivos
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/inventarioDB');

const Producto = mongoose.model('Producto', { nombre: String, cantidad: Number });

// RUTA PARA EL HTML: Ahora enviamos el archivo físico
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// RUTA API: El HTML usará esta ruta para obtener los datos de Mongo
app.get('/api/productos', async (req, res) => {
    const lista = await Producto.find();
    res.json(lista);
});

app.post('/agregar', async (req, res) => {
    const nuevo = new Producto(req.body);
    await nuevo.save();
    res.send("Producto guardado");
});

app.listen(3000, () =>{
 console.log("Servidor listo en puerto 3000");
 console.log("Accede aquí: http://localhost:3000");
});
