// Simulación de base de datos
let users = [
    {
        id: 1,
        username: 'ash',
        password: 'ash123',
        role: 'admin', // Puede ser 'admin' o 'trainer'
    },
    {
        id: 2,
        username: 'misty',
        password: 'misty123',
        role: 'trainer',
    },
    {
        id: 3,
        username: 'brock',
        password: 'brock123',
        role: 'trainer',
    }
];

// Buscar un usuario por nombre de usuario
const findUserByUsername = async (username) => {
    return users.find((user) => user.username === username);
};

// Crear un nuevo usuario
const createUser = async (username, password, role = 'trainer') => {
    const newUser = {
        id: users.length + 1,
        username,
        password,
        role,
    };
    users.push(newUser);
    return newUser;
};

module.exports = { findUserByUsername, createUser };
