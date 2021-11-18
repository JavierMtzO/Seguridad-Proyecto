var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Equipo Legion Seguridad Informática',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

module.exports = router;
