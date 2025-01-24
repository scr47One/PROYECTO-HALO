import { ProductService } from '../../../../../services/product-service.js'
import { quickSort } from './utils.js'
import { Cart } from '../../../../../model/cart.js'

const productService = new ProductService()

function addToolTip(element, message) {
    const tooltip = document.createElement('span')
    tooltip.classList.add('tooltiptext')
    tooltip.innerHTML = message
    element.classList.add('tooltip')
    element.appendChild(tooltip)
}

const productsContainer = document.getElementById('products')
let products = await productService.getProducts();
const topBar = document.getElementById('topBar')

async function chargeProductCards() {
    if (products.length > 0) {
        let productOrder;
        if (!document.getElementById('productOrder')) {
            productOrder = document.createElement('div')
            productOrder.classList.add('product-top-bar')
            productOrder.id = 'productOrder'
            const nonOrder = ['id', 'image', 'description']
            const headers = [...Object.keys(products[0]).filter(value => !nonOrder.includes(value))]
            productOrder.innerHTML = 'Ordenar'
            headers.forEach((entry) => addOrderBy(productOrder, entry))
            topBar.appendChild(productOrder)
        } else {
            productOrder = document.getElementById('productOrder')
            let children = productOrder.getElementsByTagName('button')
            for (var i = children.length - 1; i > 0; i--) {
                productOrder.removeChild(children[i])
            }
        }

        let children = productsContainer.getElementsByClassName('product-card')
        for (let i = children.length - 1; i > -1; i--) {
            productsContainer.removeChild(children[i])
        }

        products.forEach(product => {
            //card
            const card = document.createElement('div')
            card.classList.add('product-card')
            //content
            const cardTitle = document.createElement('div')
            cardTitle.classList.add('product-card-title')
            cardTitle.innerHTML = product.name

            const cardText = document.createElement('p')
            cardText.classList.add('product-card-text')
            cardText.innerHTML = product.description

            //#region IMAGE
            const cardImage = document.createElement('div')
            cardImage.style.backgroundImage = 'url("' + product.image + '")'
            cardImage.alt = product.name + ' cover'
            cardImage.classList.add('product-card-image')

            const coverContainer = document.createElement('div')
            coverContainer.classList.add('cover-container')

            const imageCover = document.createElement('img')
            imageCover.src = product.image
            imageCover.alt = product.name + ' cover'

            coverContainer.appendChild(imageCover)
            cardImage.appendChild(coverContainer)
            //#endregion

            //#region bottom

            const cardBottom = document.createElement('div')
            cardBottom.classList.add('product-card-bottom')

            const chipGroup = document.createElement('div')
            chipGroup.classList.add('chip-group')
            const chipType = document.createElement('p')
            chipType.innerHTML = product.type
            chipGroup.appendChild(chipType)
            cardBottom.appendChild(chipGroup)

            const cardTextPrice = document.createElement('h4')
            cardTextPrice.classList.add('product-card-price')
            cardTextPrice.innerHTML = '$' + product.price
            cardBottom.appendChild(cardTextPrice)

            if (product.discount > 0) {
                const chipDiscount = document.createElement('p')
                chipDiscount.style.backgroundColor = 'var(--highlight-primary-bg-color-translucent)'
                chipDiscount.innerHTML = 'oferta'
                chipGroup.appendChild(chipDiscount)

                cardTextPrice.style.textDecoration = 'line-through'
                const cardTextPriceDiscount = document.createElement('h4')
                cardTextPriceDiscount.classList.add('product-card-price-discount')
                cardTextPriceDiscount.innerHTML = '$' + (product.price - ((product.price * product.discount / 100))).toFixed(2)

                const cardTextDiscount = document.createElement('h4')
                cardTextDiscount.classList.add('product-card-discount')
                cardTextDiscount.innerHTML = '-' + product.discount + '%'

                cardBottom.appendChild(cardTextPriceDiscount)
                cardBottom.appendChild(cardTextDiscount)
            }

            //#region button
            const cardDivButton = document.createElement('div')
            cardDivButton.classList.add('btn-primary')
            const cardAddCartButton = document.createElement('button')
            cardAddCartButton.id = product.id + 'btn'
            cardAddCartButton.innerHTML = 'añadir'
            cardDivButton.addEventListener('click', () => {
                addCartProduct(product.id, 1)
            })
            //#endregion
            cardDivButton.appendChild(cardAddCartButton)
            cardBottom.appendChild(cardDivButton)
            //#endregion

            addToolTip(cardTitle, product.name)

            card.appendChild(cardImage)
            card.appendChild(cardTitle)
            card.appendChild(cardText)
            card.appendChild(cardBottom)
            productsContainer.appendChild(card)
        })
    }
}

/**
 * @type Array<Cart> */
const cart = []
function addCartProduct(id, quantity) {
    const prodExist = cart.findIndex(product => product.id === id)
    if (prodExist !== -1 && cart.length > 0) {
        cart[prodExist].quantity = parseInt(cart[prodExist].quantity) + parseInt(quantity)
    } else {
        cart.push({ ...products.find(producto => producto.id === id), total: 0, quantity })
    }
    chargeCart()
}

/**
 * @param {*} htmlElement 
 * @param {string} value 
 */
function addOrderBy(htmlElement, value) {

    const chevUp = 'stat_1'
    const chevDown = 'stat_minus_1'

    const orderBtn = document.createElement('div')
    orderBtn.classList.add('btn-order-container')

    const inputOrdrBtn = document.createElement('input')
    inputOrdrBtn.classList.add('btn-order-input')
    inputOrdrBtn.type = 'checkbox'
    inputOrdrBtn.id = 'btnOrderProductPrice-' + value

    const labelOrdrBtn = document.createElement('label')
    labelOrdrBtn.htmlFor = 'btnOrderProductPrice-' + value
    labelOrdrBtn.classList.add('material-symbols-outlined')
    labelOrdrBtn.innerHTML = chevDown

    const labelOrdrText = document.createElement('label')
    labelOrdrText.htmlFor = 'btnOrderProductPrice-' + value
    labelOrdrText.classList.add('btn-order-text')
    labelOrdrText.innerHTML = value

    orderBtn.appendChild(inputOrdrBtn)
    orderBtn.appendChild(labelOrdrText)
    orderBtn.appendChild(labelOrdrBtn)

    htmlElement.appendChild(orderBtn)

    inputOrdrBtn.addEventListener('click', () => {
        labelOrdrBtn.innerHTML = inputOrdrBtn.checked ? chevUp : chevDown
        products = inputOrdrBtn.checked ? quickSort(products, value) : (quickSort(products, value)).reverse()
        chargeProductCards()
    })
}

const sideBar = document.getElementById('sideBar')
const buttonCart = document.getElementById('buttonCart')

buttonCart.addEventListener('click', () => {
    if (buttonCart.checked) {
        sideBar.style.visibility = 'visible'
        sideBar.style.width = '50vw'
    } else {
        sideBar.style.visibility = 'collapse'
        sideBar.style.width = '0'
    }
})

const cartContainer = document.getElementById('cartContainer')
cartContainer.classList.add('cart-card-container')

const discountCode = 0

async function chargeCart() {

    let children = cartContainer.getElementsByClassName('cart-card')
    if (children.length > 0) {
        for (let i = children.length - 1; i > -1; i--) { cartContainer.removeChild(children[i]) }
    }

    let total = 0
    const badge = document.getElementById('cartBadge')
    if (cart.length > 0) {
        badge.style.visibility = 'visible'
        badge.innerHTML = cart.length

        cart.map(product => {
            const card = document.createElement('div')
            card.classList.add('cart-card')
            //#region IMAGE
            const cardImage = document.createElement('div')
            cardImage.style.backgroundImage = 'url("' + product.image + '")'
            cardImage.alt = product.name + ' cover'
            cardImage.classList.add('cart-card-image')

            const coverContainer = document.createElement('div')
            coverContainer.classList.add('cover-container')

            const imageCover = document.createElement('img')
            imageCover.src = product.image
            imageCover.alt = product.name + ' cover'

            coverContainer.appendChild(imageCover)
            cardImage.appendChild(coverContainer)
            //#endregion

            //#region bottom
            const cardSection = document.createElement('div')
            cardSection.classList.add('cart-card-section')

            const cardTitle = document.createElement('div')
            cardTitle.classList.add('cart-card-title')
            cardTitle.innerHTML = product.name

            const cardText = document.createElement('p')
            cardText.classList.add('cart-card-text')
            cardText.innerHTML = product.description

            cardSection.appendChild(cardTitle)
            cardSection.appendChild(cardText)

            const cardBottom = document.createElement('div')
            cardBottom.classList.add('cart-card-tail')

            const cardTextPriceContainer = document.createElement('div')
            cardTextPriceContainer.classList.add('cart-card-price-container')

            const cardTextPrice = document.createElement('h4')
            cardTextPrice.classList.add('cart-card-price')
            cardTextPrice.innerHTML = '$' + (product.price * product.quantity).toFixed(2)
            cardBottom.appendChild(cardTextPrice)

            let subtotal = ((product.price - ((product.price * (product.discount + discountCode) / 100))) * product.quantity).toFixed(2)
            total += parseFloat(subtotal)

            if (product.discount > 0) {
                cardTextPrice.style.textDecoration = 'line-through'
                const cardTextPriceDiscount = document.createElement('h4')
                cardTextPriceDiscount.classList.add('cart-card-price-discount')
                cardTextPriceDiscount.innerHTML = '$' + subtotal

                const cardTextDiscount = document.createElement('h4')
                cardTextDiscount.classList.add('cart-card-discount')
                cardTextDiscount.innerHTML = '-' + product.discount + '%'

                cardBottom.appendChild(cardTextPriceDiscount)
                cardBottom.appendChild(cardTextDiscount)
            }

            //#region button //! cambios aquí
            const cardRemove = document.createElement('button')
            cardRemove.classList.add('material-symbols-outlined')
            cardRemove.innerHTML = 'delete'

            cardRemove.addEventListener('click', () => {
                cart.splice(cart.indexOf(cart.find(element => element.id === product.id)), 1)
                chargeCart()
            })
            cardBottom.appendChild(cardRemove)

            const cardDivButton = document.createElement('div')
            cardDivButton.classList.add('cart-card-quantity-input')

            const cardPlusButton = document.createElement('button')
            cardPlusButton.classList.add('material-symbols-outlined')
            cardPlusButton.innerHTML = 'add'
            cardPlusButton.addEventListener('click', () => {
                cardAddCartButton.stepUp()
                product.quantity = cardAddCartButton.value
                chargeCart()
            })

            const cardMinusButton = document.createElement('button')
            cardMinusButton.classList.add('material-symbols-outlined')
            cardMinusButton.innerHTML = 'remove'
            cardMinusButton.addEventListener('click', () => {
                cardAddCartButton.stepDown()
                product.quantity = cardAddCartButton.value
                if(cardAddCartButton.value <= 0) cart.splice(cart.indexOf(cart.find(element => element.id === product.id)), 1)
                chargeCart()
            })

            const cardAddCartButton = document.createElement('input')
            cardAddCartButton.type = 'number'
            cardAddCartButton.id = product.id + 'qtty'
            cardAddCartButton.placeholder = '0'
            cardAddCartButton.value = product.quantity

            //#endregion
            cardDivButton.appendChild(cardPlusButton)
            cardDivButton.appendChild(cardAddCartButton)
            cardDivButton.appendChild(cardMinusButton)
            cardBottom.appendChild(cardDivButton)
            //#endregion

            card.appendChild(cardImage)
            card.appendChild(cardSection)
            card.appendChild(cardBottom)

            cartContainer.appendChild(card)
        })

    } else {
        badge.style.visibility = 'hidden'
        badge.innerHTML = cart.length
        const card = document.createElement('div')
        card.classList.add('cart-card')
        const emptyCartText = document.createElement('h3')
        emptyCartText.innerHTML = 'No hay nada en tu carrito'
        card.appendChild(emptyCartText)
        cartContainer.appendChild(card)
    }
    document.getElementById('total').innerHTML = `$${total.toFixed(2)}`
}

chargeCart()
chargeProductCards()