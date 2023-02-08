const express = require('express')
const CarbonController = require('../controllers/carbonController')
const router = express.Router()


// router.get('/', (req, res) => {
//     res.send('Hello Carbon!')
//   })

router.get('/tobbaco', CarbonController.calculateTobbaco)





module.exports = router