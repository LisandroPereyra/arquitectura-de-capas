import CartModel from "../../models/cart.js"
import CartManager from "../dao/classes/MongoDB/CartManager.js"

class CartController { 
    #carts
    constructor(){
        this.#carts = []
    }

    static async createCart (req, res) {
        try {
            await CartManager.createCart({
                products: []

            })

            res.status(201).json("carrito creado")
        } catch (error) {
            console.log(error);

        }
    }

    static async getCart (req, res) {
        const {id} = req.params

        try {
             const result = await CartManager.getCart(id)
             
             res.status(201).json(result)

        } catch (error) {
            console.log(error);
        } 
    }

    static async addProduct (req, res) {
        const {cid} = req.params
        const {pid} = req.params
        
        try {
            let cart = await CartManager.addProduct(cid, pid)
            

            res.status(201).json(cart)
        } catch (error) {
            console.log(error);
        }
    }

    static async addProductQuantity (req, res) {
        const {cid} = req.params
        const {pid} = req.params
        
        try {
            let cart = await CartManager.addProductQuantity(cid, pid)
            res.status(201).json(cart)

        } 
        catch (error) {
            console.log(error);
        }
    }

    // static async addProducts (cid, array) {
        
        
        
    //     try {
    //         let cart = await CartModel.findById(cid)
    //         array.forEach(async element => {
    //             console.log(element);
    //             const { prodId, quantity } = element
    //             let id = cart.products.findIndex(prod => prod.productId == prodId)
    //             if (id > -1) {
    //                 console.log("Este producto ya existe");
    //                 cart.products[id].quantity += parseInt(quantity)
    //             }
    //             else {
    //                 cart.products.push(element)
    //                 console.log(`Producto nuevo agregado`);
    //             }
    //         });
    //         let update = await CartModel.findByIdAndUpdate(cid, cart)
    //         return update
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    static async deleteProduct(req, res) {
        const {cid} = req.params
        const {pid} = req.params
        
        try {
            let cart = await CartManager.deleteProduct(cid, pid)
            res.status(201).json(cart)
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteCart(req,res) {
        const {cid} = req.params
        
        try {
            let cart = await CartManager.deleteCart(cid)
            res.status(201).json(cart)
        } catch (error) {
            console.log(error);
        }
    }
}

export default CartController