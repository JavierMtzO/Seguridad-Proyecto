const nuevo_usuario = require('../models/users')
const bcrypt = require('bcryptjs');

exports.getLogin = (request, response, next) => {
    // const javier = new nuevo_usuario('Javier', 'Martinez', 'javier@tec.mx', 'javier');
    // javier.save();
    response.render('login');
};

exports.postLogin = (request, response, next) => {
    request.session.error = undefined;
    request.session.email = request.body.email;
    nuevo_usuario.fetchOne(request.session.email)
        .then(([rows_usuario, fieldData]) => {
            bcrypt.compare(request.body.password, rows_usuario[0].password)
                .then(doMatch => {
                    if (doMatch) {
                        request.session.isLoggedIn = true;
                        request.session.user = rows_usuario[0].name;
                        return request.session.save(err => {
                            response.redirect('/inicio');
                        });
                    }
                    request.session.error = "Usuario y/o contraseña incorrectos";
                    response.redirect('login');
                }).catch(err => {
                    console.log(err);
                    request.session.error = "Usuario y/o contraseña incorrectos";
                    response.redirect('login');
                });
        }).catch(err => {
            console.log(err);
            request.session.error = "Usuario y/o contraseña incorrectos";
            response.redirect('login');
        });
};

exports.getHome = (request, response, next) => {
    response.render('inicio');
};

exports.logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/'); //Este código se ejecuta cuando la sesión se elimina.
    });
};