import { Router } from "express";
import ProductController from "../../controllers/ProductController.js"
import Utils from '../../utils/utils.js'

const ProductsRouter = Router()

ProductsRouter
.get('/me/getProducts', Utils.authJWTMiddleware(['admin', 'user']), ProductController.getProducts)
.get('/getProductById/:id', Utils.authJWTMiddleware(['admin']), ProductController.getProductById)
.post('/addProduct', Utils.authJWTMiddleware(['admin']), ProductController.addProduct)
.put('/updateProduct/:id', Utils.authJWTMiddleware(['admin']), ProductController.updateProduct)
.delete('/deleteProduct/:id', Utils.authJWTMiddleware(['admin']), ProductController.deleteProduct)

export default ProductsRouter;

//http://localhost:8080/api/products/updateProduct/:id