import { Router } from "express";

import ProductModel from "../../dao/models/product";

const ViewProductRouter = Router()

ViewProductRouter.get("/renderprod", async(req, res)=>{
    try{
            const products = await ProductModel.paginate(getQuery, {limit:getLimit, page:getPage, sort: `${getSort}price`})


        
        if(!products){
            throw new Error(`sin prod `) 
        }
            res.render("products",{productos: products.product})
    }  catch(error){
        console.log(error)
        res.status(500).send("Product Render Error")
    }
})

export default ViewProductRouter