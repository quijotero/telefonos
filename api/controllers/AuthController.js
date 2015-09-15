/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    login: function(req, res) {

        passport.authenticate('local',
          function(err, user, info) {
            if ((err) || (!user)) {

                /*return res.send({
                    message: info.message,
                    user: user
                });*/
                return  res.status(401).send('Servidor - Usuario no autentificado'); 
            }
            req.logIn(user, function(err) {
                if (err) res.redirect("/login");//res.send(err);
                /*return res.send({
                    message: info.message,
                    user: user
                });*/
                return res.redirect("/");
            });
        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        res.redirect("/");
    },

    /** Funcion para saber si un usuario está autentificado en este momento.
    * 	Devuelve error 401 a AngularJs para indicar que no está autentificado y ya
    *   actuará en consecuencia desde la parte cliente
    */
    loggedin: function(req,res) {
        if(req.isAuthenticated()) {
          res.send(req.user);
        }
        else {
          //res.forbidden('Servidor - Usuario no autentificado');
          res.status(401).send('Servidor - Usuario no autentificado');
        }
    }
};
