const { pokemons } = require('../models/pokemon.model');

// Obtener todos los Pokémon
const getAllPokemons = (page, limit) => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedData = {
        total: pokemons.length,        // Total de Pokémon disponibles
        page,                         // Página actual
        limit,                        // Número de Pokémon por página
        results: pokemons.slice(startIndex, endIndex) // Subconjunto de Pokémon para la página actual
    };

    return paginatedData;
};

// Obtener un Pokémon por ID
const getPokemonById = (id) => {
    return pokemons.find(p => p.id === parseInt(id));
};

// Obtener los Pokémon del entrenador autenticado
const getMyPokemons = (trainerId) => {
    return pokemons.filter(p => p.trainerId === trainerId);
};

// Crear un nuevo Pokémon
const createPokemon = (name, type, level, trainerId) => {
    const newPokemon = {
        id: pokemons.length + 1,
        name,
        type,
        level,
        trainerId,
        createdAt: new Date()
    };
    pokemons.push(newPokemon);
    return newPokemon;
};

// Actualizar Pokémon
const updatePokemon = (id, name, type, level, trainerId) => {
    const pokemon = pokemons.find(p => p.id === parseInt(id));

    if (!pokemon) {
        return null; // Pokémon no encontrado
    }

    if (pokemon.trainerId !== trainerId) {
        return null; // El entrenador no es el dueño del Pokémon
    }

    // Actualizar los datos del Pokémon
    pokemon.name = name || pokemon.name;
    pokemon.type = type || pokemon.type;
    pokemon.level = level || pokemon.level;

    return pokemon;
};

// Eliminar Pokémon
const deletePokemon = (id, trainerId) => {
    const pokemonIndex = pokemons.findIndex(p => p.id === parseInt(id));

    if (pokemonIndex === -1) {
        return false; // Pokémon no encontrado
    }

    const pokemon = pokemons[pokemonIndex];

    if (pokemon.trainerId !== trainerId) {
        return false; // El entrenador no es el dueño del Pokémon
    }

    // Eliminar el Pokémon
    pokemons.splice(pokemonIndex, 1);

    return true;
};

// Busca Pokémon
const searchPokemonsByType = (type) => {
    // Filtra los Pokémon que coincidan con el tipo proporcionado
    return pokemons.filter(pokemon => pokemon.type.toLowerCase().includes(type.toLowerCase()));
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
