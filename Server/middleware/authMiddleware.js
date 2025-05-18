import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
    
    if (global.auth === false) return next(); // Skip authentication if global.auth is false
    
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Authorization: Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Access token is missing or invalid' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token using the secret
        req.user = decoded; // Attach decoded user info to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};