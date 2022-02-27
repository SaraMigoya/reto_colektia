
const { check } = require('express-validator');


const validateLogin = [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  
]

module.exports = { validateLogin }