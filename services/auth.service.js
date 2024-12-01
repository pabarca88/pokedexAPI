const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = "eyJpZCI6MSwidXNlcm5hbWUiOiJ1c3VhcmlvMSIsInJvbGUiOiJzYWRtaW4iLCJpYXQiOjE3MzI4MjgzNjYsImV4cCI6MTczMjgzMTk2Nn0"

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado. Token no proporcionado.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decoded; // Guardamos la información del usuario en req.user
        next(); // Llamamos a next() para continuar con el siguiente middleware o controlador
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido.' });
    }
};

module.exports = authMiddleware;

