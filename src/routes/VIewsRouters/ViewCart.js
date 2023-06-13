import { Router } from "express";

import CartModel from "../../dao/models/cart";

const ViewCartRouter = Router()

ViewCartRouter.get("/:id", async(req, res)=>{
    try{
        const {id} = req.params
        const cart = await CartModel.findById(id).populate("products.productId")
        if(!cart){
            throw new Error(`el carrito ${id} `) 
        }
            res.render("carts",{carrito: carrito.products})
    }  catch(error){
        console.log(error)
        res.status(500).send("Cart Render Error")
    }
})

export default ViewCartRouter