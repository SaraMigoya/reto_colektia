var express = require('express');
var router = express.Router();
const {validateRegister} = require('../middlewares/auth/validateRegister')
const {validateLogin} = require('../middlewares/auth/validateLogin')

const { postUser, getUsers, getUser, updateUser, deleteUser, loginUser } = require('../controllers/userControllers');
const validarJWT = require('../middlewares/validarJWT');
/* POST user REGISTER */
router.post('/register', validateRegister,postUser);
router.post('/login', validateLogin,loginUser);
router.get('/', validarJWT, getUsers)
router.get('/', validarJWT, getUser)
router.put('/:id', validarJWT, updateUser)
router.delete('/:id', validarJWT, deleteUser)

//FALTA AGREGAR VALIDACIONES

module.exports = router