import { Product } from "../model/product.js";

export class ProductService {
    constructor() {
        this.url = "/src/services/providers/data/products.json"
    }

    /**
     * @returns {Promise<Product[] | undefined>} products
     */
    async getProducts() {
        /**@type Product[] */
        let products;
        try {
            const response = await fetch(this.url)
            if (!response.ok) {
                throw new Error('No se cargaron los datos correctamente')
            } else {
                const data = await response.json()
                products = data.map(element => new Product(
                    element.id,
                    element.name,
                    element.description,
                    element.price,
                    element.image,
                    element.type,
                    element.discount));
            }
        } catch (e) {
            console.error(e)
        } finally {
            return products
        }
    }

    /**
     * @param {number} id
     * @returns {Promise<Product>} product
     */
    async getProduct(id) {
        /**@type Product */
        let product;
        try {
            const response = await fetch(this.url)
            if (!response.ok) {
                throw new Error('No se cargaron los datos correctamente')
            } else {
                const data = await response.json()
                /**@type Product[] */
                let products = data.map(product => new Product({ ...product }))
                product = products.find(product => product.id === id)
                if (!product) throw new Error('No se encontró el producto')
            }
        } catch (e) {
            console.error(e)
        } finally {
            return product
        }
    }

}