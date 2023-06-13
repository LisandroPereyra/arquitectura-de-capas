import { Router } from "express";

import ProductRouter from "./ProductsRouter.js"
import CartRouter from "./CartRouter.js"
import AuthRouter from "./auth.js";

const ApiRouter = Router()

ApiRouter.use('/auth', AuthRouter)
ApiRouter.use('/products', ProductRouter)
ApiRouter.use('/carts', CartRouter)


export default ApiRouter