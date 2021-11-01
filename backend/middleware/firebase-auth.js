const firebaseAdmin = require('../services/firebase-admin');

module.exports = async (req, res, next) => {
    req.user = null;
    try {
        const authHeader = req.headers.authorization;
        const authToken = authHeader.split(' ')[1]
        const decodedIdToken = await firebaseAdmin.auth().verifyIdToken(authToken);
        req.user = decodedIdToken;
        next();
    } catch {
        res.status(403).send({error: 'Forbidden'});
    }
}