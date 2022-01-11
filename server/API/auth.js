import jwt from 'jsonwebtoken';

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify the token
        req.user = decoded; // add the decoded user to the request
        next(); // pass the request to the next handler
    } catch (ex) {
        return res.status(400).send('Invalid token.');
    }
}

export default auth;