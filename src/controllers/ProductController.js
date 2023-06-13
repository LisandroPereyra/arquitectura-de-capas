import { json } from "express";
import ProductModel from "../../models/product.js";
import ProductManager from "../dao/classes/MongoDB/ProductManager.js"


class ProductController {
  
  // constructor() {
  //   this.products = [];
  // }
  
  static async getProducts (req, res) {
    const { limit, page, query, sort } = req.query;
    const products = await ProductManager.getProducts(limit, page, query, sort)
    
    
    res.status(201).json(products)
  }


  static async getProductById (req, res) {
    const {id} = req.params 
    let product = await ProductManager.getProductById(id)
    res.status(201).json(product)
  }

  static async addProduct (req, res) {
    const {body}= req
    const product = {...body}

       const result = await ProductManager.addProduct(product)

        res.status(201).json(result)

  }

  static async updateProduct (req, res) {
    
    const {id} = req.params
    const {body}= req
    const product = {...body}

         const result = await ProductManager.updateProduct(id, product)

          res.status(201).json(result)

  }
//http://localhost:8080/api/products/updateProduct/
  static async deleteProduct (req, res) {

    const {id} = req.params
    try {
        await ProductManager.deleteProduct(id)
        res.status(201)
    } catch (error) {
        res.status(404);
    }
  }
}

export default ProductController;