const midtransClient = require("midtrans-client")
const {User} = require("../models/index")
class MidtransController {
    static async getTransaction(req, res) {
        try {
            let uniqueOrder = Math.floor(10000+Math.random()*19989)
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_KEY,
            })
            
            let parameter = {
                transaction_details: {
                    order_id: `YOUR-ORDERID-${uniqueOrder}`,
                    gross_amount: 200000,
                },
                credit_card: {
                    secure: true,
                },
                customer_details: {
                    Name: req.user.username,
                    email: req.user.email,
                },
            }

            snap.createTransaction(parameter).then((transaction) => {
                // transaction token
                let transactionToken = transaction
                res.status(201).json(transactionToken)
            })
        } catch (err) {
            res.status(500).json({message:"Server internal error"})
        }
    }
    static async userSubscribe(req,res){
        try {
            let id = req.user.id
            await User.update({
                status:'premium'
            },{
                where:{
                    id
                },
                hooks:false
            })
            res.status(201).json({message:`user with email ${req.user.email} success subscribe`})
        } catch (err) {
            res.status(500).json({message:"Internal server error"})
        }
    }
}

module.exports = MidtransController
