const { response } = require('express');
const{User,Product,Category,Invoice}=require('../models/index')

class CustomerController{

    static async detailProduct(req,response){
        try {
            const id=req.params.id
            const data= await Product.findOne({
                where:{
                    id
                }
            })

            response.status(200).json(data);
        } catch (error) {
            response.status(500).json(error)
        }
    }
    static async buyProduct(req,response){
        try {
            const ProductId = req.params.id;
            const UserId = req.user.id
            const product= await Product.findOne({
                attributes:['price'],
                where:{
                    id:ProductId
                }
            })
            let totalPrice = product.price
            const data= await Invoice.create({
                ProductId,
                UserId,
                totalPrice
            })
            response.status(200).json(data)
        } catch (error) {
            console.log(error);
            response.status(500).json(error)
        }
    }
}

module.exports=CustomerController;