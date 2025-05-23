const express = require('express');
const router = express.Router();
const filmeController = require('../controllers/filmeController');
const { isAuthenticated } = require('../middlewares/auth');

//publico
router.get('/list', filmeController.listar);
router.get('/get/:id', filmeController.detalhar);

//rotas protegidas
router.post('/create', isAuthenticated, filmeController.criar);
router.put('/update/:id', isAuthenticated, filmeController.atualizar);
router.delete('/delete/:id', isAuthenticated, filmeController.apagar);

module.exports = router; 