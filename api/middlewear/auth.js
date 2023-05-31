const jwt = require('jsonwebtoken');

// Create a middleware function to verify the access_token
function admin(req, res, next) {
    const accessToken = req.body.token;
    if (!accessToken) {
        return res.status(401).send({ error: 'Unauthorized' });
    }
    
    jwt.verify(accessToken,"secret", (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Unauthorized' });
        }
        if (decoded.isAdmin !== true) {
            return res.status(401).send({ error: 'Unauthorized' });
        }
        req.userId = decoded.id; // Use the _id claim instead of the userId claim
        
        next();
    });
}

// Create a middleware function to verify the refresh_token
function refresh(req, res, next) {
    const refreshToken = req.body.token;
    if (!refreshToken) {
        return res.status(401).send({ error: 'Unauthorized' });
    }
    
    jwt.verify(refreshToken,"secret", (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Unauthorized' });
        }
        req.userId = decoded.id;
        
        next();
    });
}

module.exports = {
    admin,
    refresh
};