const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/auth');

// público
router.post('/login', userController.login);
router.post('/register', userController.registar);

// rotas protegidas
router.get('/list', isAuthenticated, userController.listar);
router.get('/get/:id', isAuthenticated, userController.detalhar);
router.delete('/delete/:id', isAuthenticated, userController.apagar);

module.exports = router;
