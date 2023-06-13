import CartModel from "../../models/cart.js"

class CartManager { 
    #carts
    constructor(){
        this.#carts = []
    }

    static async createCart (req, res) {
        try {
            await CartModel.create({
                products: []

            })
            console.log("nuevo carrito creado")
            
        } catch (error) {
            console.log(error);

        }
    }

    static async getCart (id) {
        
        try {
             const result = await CartModel.findById(id).populate("products.productId")
             console.log(result)
             return result
             
        } catch (error) {
            console.log(error);
        } 
    }

    static async addProduct (cid, pid) {

        
        try {
            let cart = await CartModel.findById(cid)
            let product = cart.products.findIndex(prod => prod.productId == pid)
            let update = []
            if (product > -1) {
                cart.products[product].quantity++
                update = await CartModel.findByIdAndUpdate(cid, cart)
                return update
            } else {
                cart.products.push({productId: pid})
                update = await CartModel.findByIdAndUpdate(cid, cart)
                return update
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    static async addProductQuantity (cid, pid) {

        
        try {
            let cart = await CartModel.findById(cid, pid)
            let product = cart.products.findIndex(prod => prod.productId == pid)
            
            if (product === -1) {
                cart.products.push({productId: pid})
                const update = await CartModel.findByIdAndUpdate(cid, cart)
                return update
            }
             else {
                cart.products[product].quantity = parseInt(quantity)
                const update = await CartModel.findByIdAndUpdate(cid, cart)
                console.log(cart.products[product].quantity);
                console.log('founded');
                //probar update con const
                return update

            }

            

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

    static async deleteProduct(cid, pid) {

        
        try {
            let cart = await CartModel.findById(cid)
            let product = cart.products.findIndex(prod => prod.productId == pid)
            let update
            if (product > -1) {
                cart.products.splice((product), 1)
                update = await CartModel.findByIdAndUpdate(cid, cart)
                return update
            } else {
                return "No puedes eliminar un producto inexistente"
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteCart(cid) {

        try {
            let cart = await CartModel.findByIdAndDelete(cid)
            cart.products = []
            console.log(cart.products);
            let update = await CartModel.findByIdAndUpdate(cid, cart)
            return update
        } catch (error) {
            console.log(error);
        }
    }
}

export default CartManager