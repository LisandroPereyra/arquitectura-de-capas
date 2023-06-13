import { json } from "express";
import ProductModel from "../../models/product.js";

class ProductManager {
  
  // constructor() {
  //   this.products = [];
  // }
  
  static async getProducts (limit, page, query, sort) {
    
    let getLimit = limit !== undefined ? limit : 10
    let getPage = page !== undefined ? page: 1
    let getQuery = query !== undefined ? {category: query} : {}
    let getSort = sort === '-'? sort : '+'


    const products = await ProductModel.paginate(getQuery, {limit:getLimit, page:getPage, sort: `${getSort}price`})
    
    console.log("funciona",products)
    
  }


  static async getProductById (id) {

    let product = await ProductModel.findById(id)
    return product
  }

  static async addProduct (product) {


    try { 
       const result = await ProductModel.create(product)
        console.log('Product added', result);
        return result

    } catch (error) {
        console.log(error)
    }
  }

  static async updateProduct (id, product) {
    

    try {
         const result = await ProductModel.findByIdAndUpdate(id, product)
          console.log('updated', result );
          return result
        }
        
     catch(error) {
      console.log(error)
    }
  }
//http://localhost:8080/api/products/updateProduct/
  static async deleteProduct (id) {

    try {
        await ProductModel.findByIdAndDelete(id)
    } catch (error) {
        console.log(error);
    }
  }
}

export default ProductManager;