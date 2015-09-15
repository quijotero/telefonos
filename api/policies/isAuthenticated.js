module.exports = function(req, res, next) {
   if (req.isAuthenticated()) {
        return next();
    }
    else{
		    return res.status(401).send('Servidor - Usuario no autentificado');
    }
};
