const jwt = require('jsonwebtoken');
const { findUserByUsername, createUser } = require('../models/user.model');

// Clave secreta para el JWT
const JWT_SECRET_KEY = "eyJpZCI6MSwidXNlcm5hbWUiOiJ1c3VhcmlvMSIsInJvbGUiOiJzYWRtaW4iLCJpYXQiOjE3MzI4MjgzNjYsImV4cCI6MTczMjgzMTk2Nn0";

// Registro de nuevo entrenador
const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username y password son requeridos" });
    }

    // Verificar si el usuario ya existe
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
        return res.status(409).json({ error: "El usuario ya existe" });
    }

    // Crear el nuevo usuario
    const newUser = await createUser(username, password);

    res.status(201).json({
        message: "Usuario registrado exitosamente",
        user: {
            id: newUser.id,
            username: newUser.username,
            role: newUser.role,
        },
    });
};

// Login de entrenador
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username y password son requeridos" });
    }

    // Verificar si el usuario existe
    const user = await findUserByUsername(username);
    if (!user) {
        return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    // Verificar si la contraseña es correcta
    if (user.password !== password) {
        return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    // Generar el token JWT
    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET_KEY,
        { expiresIn: '1h' }
    );

    res.status(200).json({ token });
};

module.exports = { register, login };
