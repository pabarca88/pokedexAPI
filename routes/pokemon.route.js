const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemon.controller'); // Importar correctamente el controlador
const { createPokemonValidation,updatePokemonValidation } = require('../validations/pokemon.validation');
const { validationResult } = require('express-validator');
const authMiddleware = require('../services/auth.service.js'); // Middleware de autenticación

// Middleware para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Rutas públicas (no requieren autenticación)
router.get('/', pokemonController.getAllPokemons);
router.get('/search', pokemonController.searchPokemonsByType);
router.get('/:id', pokemonController.getPokemonById);

// Rutas protegidas (requieren autenticación)
router.get('/trainer/mypokemons', authMiddleware, pokemonController.getMyPokemons);

// Crear Pokémon con validación
router.post(
    '/',
    authMiddleware,             // Middleware de autenticación
    createPokemonValidation,    // Middleware de validación
    handleValidationErrors,     // Manejo de errores de validación
    pokemonController.createPokemon // Controlador final
);

router.put(
    '/:id',
    authMiddleware,             // Middleware de autenticación
    updatePokemonValidation,    // Middleware de validación para la actualización
    handleValidationErrors,     // Manejo de errores de validación
    pokemonController.updatePokemon // Controlador final
);
router.delete('/:id', authMiddleware, pokemonController.deletePokemon);

module.exports = router;
