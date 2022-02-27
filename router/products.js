var express = require('express');
var router = express.Router();
const { postProducts, getAllProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/productsControllers');
const validarJWT = require('../middlewares/validarJWT');

router.post('/', validarJWT, postProducts);
router.get('/', validarJWT, getAllProducts)
router.get('/:id', validarJWT, getProduct)
router.put('/:id', validarJWT, updateProduct)
router.delete('/:id', validarJWT, deleteProduct)

module.exports = router