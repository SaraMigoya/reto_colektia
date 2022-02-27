var express = require('express');
const { postOrders, getAllOrders, getOrder, updateOrder, deleteOrder } = require('../controllers/ordersControllers');
const validarJWT = require ('../middlewares/validarJWT')
var router = express.Router();

router.post('/', postOrders);
router.get('/', validarJWT, getAllOrders)
router.get('/:id', validarJWT, getOrder)
router.put('/:id', validarJWT, updateOrder)
router.delete('/:id', validarJWT, deleteOrder)

module.exports = router