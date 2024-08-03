import { validateJWT } from '../../../helpers/customJWT/jwtHelper.js';

/**
 * Middleware to authenticate the token from the request headers
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 * @returns {void}
 */
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    const user = validateJWT(token);
    if (!user) return res.sendStatus(403);

    req.user = user;
    next();
};

/**
 * Middleware to authorize the user based on their role
 * @param {string} role - The required role for the route
 * @returns {Function} - Express middleware function
 */
const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Access forbidden: Admins only' });
        }
        next();
    };
};

export { authenticateToken, authorizeRole };

