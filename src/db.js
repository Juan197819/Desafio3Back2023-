import fs from 'fs'
import productsList from './products.js'  

class ProductManager {
    constructor(path){
        this.path=path
    }
    async addProduct(product){
        if(product){
            const arrayProd = await this.getProducts()
            product.id = arrayProd.length + 1
            arrayProd.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(arrayProd))
            return product
        }else{
            return 'Datos incompletos, intentelo nuevamente'
        }
    }
    async getProducts(limit){
        if (fs.existsSync(this.path)) {
            const file = await fs.promises.readFile(this.path, 'utf-8')
            const fileParse = JSON.parse(file)
            limit&&fileParse.splice(limit)
            return fileParse 
        }else{
            //para crear file.txt la primera vez desde el array de products.js
            for (let i = 0; i < productsList.length; i++) {
                productsList[i].id =i +1
            }    
            await fs.promises.writeFile(this.path, JSON.stringify(productsList))
            return productsList
        }
    }
    async getProductById(id){
        const products = await this.getProducts()
        const producto = products.find(product=>product.id==id)
        if(producto){
            return producto
        }else{
        return 'Not found'
        }
    }
    async updateProduct(id, product){
        const arrayProd = await this.getProducts()
        if (arrayProd.length&&id&&product) {
            const updateArray = arrayProd.map( p => {
               if (p.id==id){
                    product.id=id
                   return product
                }else{
                    return p
                }
            })
            await fs.promises.writeFile(this.path, JSON.stringify(updateArray))
            return updateArray
        } else {
            return 'Error no se puede actualizar'
        }
    }
    async deleteProduct(id){
        const arrayProd = await this.getProducts()
        if (arrayProd.length&&id) {
            const newArray = arrayProd.filter(p=>p.id!=id)
            await fs.promises.writeFile(this.path, JSON.stringify(newArray))
            return (newArray);
        } else {
            return 'Error no se puede eliminar'
        }
    }
}
const productManager = new ProductManager('./file.txt')

export default productManager

