const express = require('express')
const router = express.Router();

const validarJWT = require('../middlewares/validarJWT');
const { upload } = require('../controllers/uploadController');

router.post('/', validarJWT, upload);

module.exports = router