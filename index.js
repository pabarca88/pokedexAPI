const express = require('express');
const authRoutes = require('./routes/auth.route');
const pokemonRoutes = require('./routes/pokemon.route');

const app = express();
const PORT = 3000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Rutas de autenticación y Pokémon
app.use('/auth', authRoutes);
app.use('/pokemon', pokemonRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
