

import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    // Get the token from the request header (it's usually formatted "Bearer <token>")
    const token = req.headers.authorization.split(' ')[1]; 
    
    if (!token) {
        return res.status(401).send({ message: 'Authorization token missing.' });
    }

    try {
        // Verify the token using your secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach the userId to the request for use in the next function
        req.userId = decoded.userId; 
        
        // Move on to the next function (the actual route handler)
        next();
        
    } catch (error) {
        // If the token is invalid or expired
        return res.status(401).send({ message: 'Invalid token.' });
    }
};

export default authMiddleware;