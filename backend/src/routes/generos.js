const express = require('express');
const router = express.Router();
const generoController = require('../controllers/generoController'); 
const { isAuthenticated } = require('../middlewares/auth');

//publico
router.get('/list', generoController.listar);
router.get('/get/:id', generoController.detalhar);

//rotas protegidas
router.post('/create', isAuthenticated, generoController.criar);
router.put('/update/:id', isAuthenticated, generoController.atualizar);
router.delete('/delete/:id', isAuthenticated, generoController.apagar);

module.exports = router;
