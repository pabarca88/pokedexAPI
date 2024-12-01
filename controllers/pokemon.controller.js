const pokemonService = require('../services/pokemon.service');

// Ver todos los Pokémon
const getAllPokemons = (req, res) => {
    const { page = 1, limit = 150 } = req.query; // Valores por defecto
    const paginatedPokemons = pokemonService.getAllPokemons(parseInt(page), parseInt(limit));
    res.status(200).json(paginatedPokemons);
};

// Ver detalle de un Pokémon
const getPokemonById = (req, res) => {
    const { id } = req.params;
    const pokemon = pokemonService.getPokemonById(id);
    if (!pokemon) return res.status(404).json({ message: "Pokémon no encontrado2" });
    res.status(200).json(pokemon);
};

// Ver mis Pokémon (autenticado)
const getMyPokemons = (req, res) => {
    const { id } = req.user; // El ID del entrenador autenticado
    const myPokemons = pokemonService.getMyPokemons(id);
    res.status(200).json(myPokemons);
};

// Crear nuevo Pokémon (autenticado)
const createPokemon = (req, res) => {
    const { name, type, level } = req.body;
    const newPokemon = pokemonService.createPokemon(name, type, level, req.user.id);
    res.status(201).json(newPokemon);
};

// Actualizar Pokémon (autenticado)
const updatePokemon = async (req, res) => {
    const { id } = req.params;  // ID del Pokémon a actualizar
    const { name, type, level } = req.body;  // Datos de la solicitud

    try {
        // Llamamos al servicio para actualizar el Pokémon
        const updatedPokemon = await pokemonService.updatePokemon(id, name, type, level, req.user.id);
        
        if (!updatedPokemon) {
            return res.status(404).json({ message: "Pokémon no encontrado" });
        }
        
        res.status(200).json(updatedPokemon);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el Pokémon", error: error.message });
    }
};


// Eliminar Pokémon (autenticado)
const deletePokemon = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await pokemonService.deletePokemon(id, req.user.id);
        if (!deleted) {
            return res.status(404).json({ message: "Pokémon no encontrado o no autorizado para eliminar" });
        }
        res.status(200).json({ message: "Pokémon eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el Pokémon", error: error.message });
    }
};

// Buscar Pokémon por tipo
const searchPokemonsByType = (req, res) => {
    const { type } = req.query;  // Obtener el tipo de la consulta de parámetros de búsqueda (query string)
    
    if (!type) {
        return res.status(400).json({ message: "Debe especificar un tipo de Pokémon para la búsqueda" });
    }

    const pokemonsByType = pokemonService.searchPokemonsByType(type);  // Llamamos al servicio de búsqueda por tipo

    if (pokemonsByType.length === 0) {
        return res.status(404).json({ message: `No se encontraron Pokémon de tipo ${type}` });
    }

    res.status(200).json(pokemonsByType);  // Retornamos los Pokémon encontrados
};

module.exports = {
    getAllPokemons,
    getPokemonById,
    getMyPokemons,
    createPokemon,
    updatePokemon,
    deletePokemon,
    searchPokemonsByType
};
