const express = require('express')
const CustomerController = require('../controllers/customerController')
const router = express.Router()

// router.get('/', (req, res) => {
//     res.send('Hello Customer!')
//   })

router.post('/register', CustomerController.register)
router.post('/login', CustomerController.login)






module.exports = router