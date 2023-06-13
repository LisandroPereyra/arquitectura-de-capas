import { Router } from "express";

import ProductViewRouter from "./ViewProducts.js"
import CartViewRouter from "./ViewCart.js"

const ViewRouter = Router()

ViewRouter.use('/productsview', ProductViewRouter)
ViewRouter.use('/cartsview', CartViewRouter)


export default ViewRouter