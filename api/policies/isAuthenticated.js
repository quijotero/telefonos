/**
	POLITICA DE COMPROBACION DE AUTENTIFICACIÓN
	
	Esta política es llamada cada vez que un controlador concreto va a ejecutar una acción 
	que necesita que el usuario esté autentificado antes. Para ver cuales son las acciones que 
	llaman a esta política mirar el fichero "policies.js"
*/
module.exports = function(req, res, next) {
   if (req.isAuthenticated()) {
        return next();
    }
    else{
		    return res.status(401).send('Servidor - Usuario no autentificado');
    }
};
