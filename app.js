const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const Controller = require('./Controllers/controller')
const authentication = require('./middleware/auth')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.post('/register', Controller.register)
app.post('/login', Controller.login)
///get user status BMI
app.get('/getbmi', authentication, Controller.getBmi)
app.get('/listofbodypart', authentication, Controller.getBodyPart)
app.get('/exercisebybodypart', authentication, Controller.getExerciseByBodyPart)
app.get('/listofequipment', authentication, Controller.getEquipment)
app.get('/exercisebyequipment', authentication, Controller.getExerciseByEquipment)
app.get('/trainer', authentication, Controller.getTrainer)
app.post('/addmyexercise', authentication, Controller.addMyExercise)
app.get('/myexercise', authentication, Controller.getMyExercise)


app.post('/midtrans-token', authentication, Controller.midtrans)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})