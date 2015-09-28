/**
* Acceso.js
*
* @description :: Modelo para autentificacion, guarda los usuarios que permiten hacer login
* @docs        :: http://iliketomatoes.com/implement-passport-js-authentication-with-sails-js-0-10-2/
*/

var bcrypt = require('bcrypt');

module.exports = {
    attributes: {
        nombre: {
            type: 'string',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            minLength: 6,
            required: true
        },
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
    },
    beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.log("Error encriptando la clave:" + err);
                    cb(err);
                } else {
                    user.password = hash;
                    cb();
                }
            });
        });
    }
};
