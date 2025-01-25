import { ProductService } from '../../../../../services/product-service.js'
import { quickSort } from './utils.js'
import { Cart } from '../../../../../model/cart.js'
import { Product } from '../../../../../model/product.js'

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
            productOrder.innerHTML = 'Ordenar'
            topBar.appendChild(productOrder)
            const nonOrder = ['id', 'image', 'description', 'author']
            const headers = [...Object.keys(products[0]).filter(value => !nonOrder.includes(value))]
            headers.forEach((entry) => addOrderBy(productOrder, entry))
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
            const cardTitle = document.createElement('div')
            const cardText = document.createElement('p')
            const cardImage = document.createElement('div')
            const coverContainer = document.createElement('div')
            const imageCover = document.createElement('img')
            const cardBottom = document.createElement('div')
            const chipGroup = document.createElement('div')
            const chipType = document.createElement('p')
            const cardTextPrice = document.createElement('h4')
            const cardDivButton = document.createElement('div')
            const cardAddCartButton = document.createElement('button')

            card.classList.add('product-card')
            cardTitle.classList.add('product-card-title')
            cardText.classList.add('product-card-text')
            cardImage.classList.add('product-card-image')
            coverContainer.classList.add('cover-container')
            cardBottom.classList.add('product-card-bottom')
            chipGroup.classList.add('chip-group')
            cardTextPrice.classList.add('product-card-price')
            cardDivButton.classList.add('btn-primary')

            cardTitle.innerHTML = product.name
            cardText.innerHTML = product.description
            cardImage.style.backgroundImage = 'url("' + product.image + '")'
            cardImage.alt = product.name + ' cover'
            imageCover.src = product.image
            imageCover.alt = product.name + ' cover'
            chipType.innerHTML = product.type
            cardTextPrice.innerHTML = '$' + product.price
            cardAddCartButton.id = product.id + 'btn'
            cardAddCartButton.innerHTML = 'añadir'

            chipGroup.appendChild(chipType)
            cardBottom.appendChild(chipGroup)
            cardBottom.appendChild(cardTextPrice)

            if (product.discount > 0) {
                const chipDiscount = document.createElement('p')
                const cardTextPriceDiscount = document.createElement('h4')
                const cardTextDiscount = document.createElement('h4')
                cardTextPriceDiscount.classList.add('product-card-price-discount')
                cardTextDiscount.classList.add('product-card-discount')

                chipDiscount.style.backgroundColor = 'var(--highlight-primary-bg-color-translucent)'
                chipDiscount.innerHTML = 'oferta'
                cardTextPrice.style.textDecoration = 'line-through'
                cardTextPriceDiscount.innerHTML = '$' + (product.price - ((product.price * product.discount / 100))).toFixed(2)
                cardTextDiscount.innerHTML = '-' + product.discount + '%'

                chipGroup.appendChild(chipDiscount)
                cardBottom.appendChild(cardTextPriceDiscount)
                cardBottom.appendChild(cardTextDiscount)
            }

            cardDivButton.addEventListener('click', () => fillProductView(product))

            addToolTip(cardTitle, product.name)

            cardDivButton.appendChild(cardAddCartButton)
            cardBottom.appendChild(cardDivButton)
            coverContainer.appendChild(imageCover)
            cardImage.appendChild(coverContainer)
            card.appendChild(cardImage)
            card.appendChild(cardTitle)
            card.appendChild(cardText)
            card.appendChild(cardBottom)
            productsContainer.appendChild(card)
        })
    }
}

/**
 * 
 * @param {Product} product 
 */
function fillProductView(product) {
    const windowProduct = document.getElementById('windowProduct');

    const viewBackgroundContainer = document.getElementById('viewBackgroundContainer');
    const viewCoverContainer = document.getElementById('viewCoverContainer');
    const viewTitle = document.getElementById('viewTitle');
    const viewAuthor = document.getElementById('viewAuthor');
    const viewPrice = document.getElementById('viewPrice');
    const viewChipGroup = document.getElementById('viewChipGroup');
    const viewBtnReturn = document.getElementById('viewBtnReturn');
    const viewBtnAdd = document.getElementById('viewBtnAdd');
    const viewDescription = document.getElementById('viewDescription');

    const viewChipType = document.createElement('p')


    viewBackgroundContainer.style.backgroundImage = `url('${product.image}')`
    viewCoverContainer.style.backgroundImage = `url('${product.image}')`
    viewTitle.innerHTML = product.name
    viewAuthor.innerHTML = product.author
    viewPrice.innerHTML = '$' + product.price
    viewChipType.innerHTML = product.type
    viewDescription.innerHTML = product.description
    windowProduct.style.visibility = 'visible'
    windowProduct.style.opacity = '1'
    windowProduct.style.width = 'calc(100% - 200px)'
    windowProduct.style.height = 'calc(100% - 200px)'
    
    if (product.discount > 0) {
        const viewOffer = document.createElement('p')
        const viewDiscount = document.getElementById('viewDiscount')
        const viewPriceDiscount = document.getElementById('viewPriceDiscount');

        viewOffer.innerHTML = 'oferta'
        viewPrice.style.textDecoration = 'line-through'
        viewOffer.style.backgroundColor = 'var(--highlight-primary-bg-color-translucent)'
        viewDiscount.innerHTML = '-' + product.discount + '%'
        viewPriceDiscount.innerHTML = '$' + (product.price - ((product.price * product.discount / 100))).toFixed(2)
        viewChipGroup.appendChild(viewOffer)
    }

    viewBtnReturn.addEventListener('click', () => {
        windowProduct.style.visibility = 'hidden'
        windowProduct.style.opacity = '0'
        windowProduct.style.width = '0'
        windowProduct.style.height = '0'
        windowProduct.style.transition = 'opacity 0.2s linear, visibility 0.2s linear, width 0.2s linear, height 0.2s linear'
        resetProductView()
    })
    viewBtnAdd.addEventListener('click', () => {
        addCartProduct(product.id, 1)
    })
    viewChipGroup.appendChild(viewChipType)
}

function resetProductView() {
    const viewChipGroup = document.getElementById('viewChipGroup');
    const viewDiscount = document.getElementById('viewDiscount');
    const viewPriceDiscount = document.getElementById('viewPriceDiscount');
    const viewPrice = document.getElementById('viewPrice');

    viewPrice.style.textDecoration = 'none'
    viewDiscount.innerHTML = ''
    viewPriceDiscount.innerHTML = ''
    viewChipGroup.innerHTML = ''
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
    const inputOrdrBtn = document.createElement('input')
    const labelOrdrBtn = document.createElement('label')
    const labelOrdrText = document.createElement('label')

    orderBtn.classList.add('btn-order-container')
    inputOrdrBtn.classList.add('btn-order-input')
    labelOrdrBtn.classList.add('material-symbols-outlined')
    labelOrdrText.classList.add('btn-order-text')

    inputOrdrBtn.type = 'checkbox'
    inputOrdrBtn.id = 'btnOrderProductPrice-' + value
    labelOrdrBtn.htmlFor = 'btnOrderProductPrice-' + value
    labelOrdrBtn.innerHTML = chevDown
    labelOrdrText.htmlFor = 'btnOrderProductPrice-' + value
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
        sideBar.style.opacity = '1'
    } else {
        sideBar.style.visibility = 'collapse'
        sideBar.style.width = '0'
        sideBar.style.opacity = '0'
        sideBar.style.transition = 'opacity 0.2s linear, visibility 0.2s linear, width 0.2s linear'
    }
})

const _buttonCart = document.getElementById('_buttonCart')
_buttonCart.addEventListener('click', () => {
    if (_buttonCart.checked) {
        sideBar.style.visibility = 'visible'
        sideBar.style.width = '50vw'
        sideBar.style.opacity = '1'
    } else {
        sideBar.style.visibility = 'collapse'
        sideBar.style.width = '0'
        sideBar.style.opacity = '0'
    }
})

const cartContainer = document.getElementById('cartContainer')
cartContainer.classList.add('cart-card-container')

const discountCode = 0

async function chargeCart() {
    cartContainer.innerHTML = ''

    let total = 0
    const badge = document.getElementById('cartBadge')
    if (cart.length > 0) {
        badge.style.visibility = 'visible'
        badge.innerHTML = cart.length

        cart.map(product => {
            const card = document.createElement('div')
            const cardImage = document.createElement('div')
            const coverContainer = document.createElement('div')
            const imageCover = document.createElement('img')
            const cardSection = document.createElement('div')
            const cardTitle = document.createElement('div')
            const cardText = document.createElement('p')
            const cardBottom = document.createElement('div')
            const cardTextPriceContainer = document.createElement('div')
            const cardTextPrice = document.createElement('h4')

            card.classList.add('cart-card')
            cardImage.classList.add('cart-card-image')
            coverContainer.classList.add('cover-container')
            cardSection.classList.add('cart-card-section')
            cardTitle.classList.add('cart-card-title')
            cardText.classList.add('cart-card-text')
            cardBottom.classList.add('cart-card-tail')
            cardTextPriceContainer.classList.add('cart-card-price-container')
            cardTextPrice.classList.add('cart-card-price')

            cardImage.style.backgroundImage = 'url("' + product.image + '")'
            cardImage.alt = product.name + ' cover'
            imageCover.src = product.image
            imageCover.alt = product.name + ' cover'
            cardTitle.innerHTML = product.name
            cardText.innerHTML = product.description
            cardTextPrice.innerHTML = '$' + (product.price * product.quantity).toFixed(2)
            let subtotal = ((product.price - ((product.price * (product.discount + discountCode) / 100))) * product.quantity).toFixed(2)
            total += parseFloat(subtotal)

            coverContainer.appendChild(imageCover)
            cardImage.appendChild(coverContainer)
            cardSection.appendChild(cardTitle)
            cardSection.appendChild(cardText)
            cardBottom.appendChild(cardTextPrice)

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

            //#region button
            const cardRemove = document.createElement('button')
            cardRemove.classList.add('material-symbols-outlined')
            cardRemove.innerHTML = 'delete'

            cardRemove.addEventListener('click', (e) => {
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
                if (cardAddCartButton.value <= 0) cart.splice(cart.indexOf(cart.find(element => element.id === product.id)), 1)
                chargeCart()
            })

            const cardAddCartButton = document.createElement('input')
            cardAddCartButton.type = 'number'
            cardAddCartButton.id = product.id + 'qtty'
            cardAddCartButton.placeholder = '0'
            cardAddCartButton.value = product.quantity

            cardAddCartButton.addEventListener('change', () => {
                product.quantity = cardAddCartButton.value
                chargeCart()
            })

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