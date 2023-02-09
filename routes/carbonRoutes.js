const express = require('express')
const CarbonController = require('../controllers/carbonController')
const router = express.Router()


// router.get('/', (req, res) => {
//     res.send('Hello Carbon!')
//   })

router.post('/tobbaco', CarbonController.calculateTobbaco)
router.post('/vehicle', CarbonController.calculateEmission)





module.exports = router