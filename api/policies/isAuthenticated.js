module.exports = function(req, res, next) {
   if (req.isAuthenticated()) {		
        return next();
    }
    else{
        //return res.redirect('/login');
		return res.status(403).send('Operación no permitida sin autentificarse primero');
    }
};
