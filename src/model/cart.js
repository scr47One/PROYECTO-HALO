
export class Cart {
    constructor(product, quantity, total) {
        this.id = product.id
        this.name = product.name
        this.description = product.description
        this.price = product.price
        this.image = product.image
        this.type = product.type
        this.discount = product.discount
        this.quantity = quantity
        this.total = total
    }
}