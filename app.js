const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'a2jwejnirfkmci0j23fewrrmcowssr',
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

const path = require('path');
/*const csrf = require('csurf');
const csrfProtection = csrf();
const csrfMiddleware = require('./util/csrf');*/

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views');

const rutasUsuario = require('./routes/users');

//Middleware
app.use((request, response, next) => {
    console.log('Middleware!');
    next(); //Le permite a la petición avanzar hacia el siguiente middleware
});

//app.use(csrfProtection); 
//app.use(csrfMiddleware);

app.use('/css', express.static(path.join(__dirname, 'public/css')));

app.use('/', rutasUsuario);

app.use((request, response, next) => {
    console.log('Error 404');
    response.status(404);
    response.send('<h1>Página no disponible</h1>'); //Manda la respuesta
});

app.listen(3000);