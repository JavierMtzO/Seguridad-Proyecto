const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class newUser {

    constructor(name, lastname, email, password) {
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        //Dentro del método del modelo que crea el usuario
        //El segundo argumento es el número de veces que se aplica el algoritmo, actualmente 12 se considera un valor seguro
        //El código es asíncrono, por lo que hay que regresar la promesa
        return bcrypt.hash(this.password, 12)
            .then((password) => {
                return db.execute('INSERT INTO user (name, lastname, email, password) VALUES (?, ?, ?, ?)',
                    [this.name, this.lastname, this.email, password]
                );
            })
            .catch(err => {
                console.log(err);
                throw Error("El correo electrónico ingresado ya está registrado como administrador.");
            });
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM user');
    }
    static fetchOne(email) {
        return db.execute('SELECT * FROM user WHERE email = ?', [email]);
    }

}