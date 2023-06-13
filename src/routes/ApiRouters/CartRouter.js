import { Router } from "express";
import CartController from "../../controllers/CartController.js"

import Utils from '../../utils/utils.js'

const CartRouter = Router()

CartRouter
.post('/me/createCart', Utils.authJWTMiddleware(['admin', 'user']), CartController.createCart)
.get('/me/getCart/:id', Utils.authJWTMiddleware(['admin', 'user']), CartController.getCart)
.post('/me/addProduct/:cid/:pid', Utils.authJWTMiddleware(['admin', 'user']), CartController.addProduct)
.put('/me/addProductQuantity/:cid/:pid', Utils.authJWTMiddleware(['admin', 'user']), CartController.addProductQuantity)
//.post("/addProducts/:cid", CartManager.addProducts)
.delete('/me/deleteProduct/:cid/:pid', Utils.authJWTMiddleware(['admin', 'user']), CartController.deleteProduct)
.delete('/me/deleteCart/:cid', Utils.authJWTMiddleware(['admin', 'user']), CartController.deleteCart)

export default CartRouter;
//http://localhost:8080/api/carts/addProduct/644feb8dd3e6c3674120a628/643da7fe8bfdc8e12f5e5fa9