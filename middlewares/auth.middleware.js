const jwt = require('jsonwebtoken');
const privateKey = 'WdnyPAADVpZujDsd7pkDqE';

module.exports = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if(!authorization) {
            return res.status(401).send({ status: false, error: { message: 'Unauthorized' } });
        }
        const isTokenValid = jwt.verify(authorization, privateKey);
        if(!isTokenValid) {
            return res.status(401).send({ status: false, error: { message: 'Unauthorized' } });
        }
        next();
    } catch (error) {
        return res.status(401).send({ status: false, error: { message: 'Unauthorized' } });
    }
}