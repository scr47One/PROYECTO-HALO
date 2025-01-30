import { Cart } from "../model/cart.js";
export class CartService {
    /**
     * @type Cart[]
     */
    cart = [];
    constructor() { }

    addToCart(product, quantity) {
        const _quantity = parseInt(quantity) || 1;
        const index = this.cart.findIndex(item => item.id === product.id);
        if (index !== -1 && this.cart.length > 0) {
            this.cart[index].quantity += _quantity;
            this.cart[index].total = parseFloat((this.cart[index].quantity * this.cart[index].price).toFixed(2));
        } else {
            this.cart.push(new Cart(product, _quantity, product.price * _quantity));
        }
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateProductQuantityCart(id, quantity) {
        const index = this.cart.findIndex(item => item.id === id);
        if (index !== -1) {
            this.cart[index].quantity = quantity;
            this.cart[index].total = parseFloat((this.cart[index].quantity * this.cart[index].price).toFixed(2));
        }
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    removeFromCart(id) {
        localStorage.removeItem('cart');
        const index = this.cart.findIndex(item => item.id === id);
        if (index !== -1) {
            this.cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    /**
     * 
     * @returns Cart[]
     */
    getCart() {
        localStorage.getItem('cart')
            ? this.cart = (JSON.parse(localStorage.getItem('cart')))
                .map(item => new Cart(item, item.quantity, item.total)
                )
            : this.cart = [];
        return this.cart;
    }

    getTotal() {
        return this.cart.reduce((acc, item) => acc + item.total, 0);
    }

    clearCart() {
        this.cart = [];
    }
}