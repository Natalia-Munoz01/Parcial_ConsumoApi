const express = require('express');
const cors = require('cors');
const path = require('path');
const starWarsRoutes = require('./routes/starWars');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/starWars', starWarsRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.redirect('/starWars/all'); // Redirigir a la vista con todos los personajes
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
