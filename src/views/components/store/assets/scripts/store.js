import { ProductService } from '../../../../../services/product-service.js'
import { quickSort } from './utils.js'
import { Cart } from '../../../../../model/cart.js'
import { Product } from '../../../../../model/product.js'
import { CartService } from '../../../../../services/cart-service.js'
import { toastMessage } from '../../../../assets/scripts/feedback.js'

const productService = new ProductService()

/**
 * @type number */
let selectedProduct = null
let selectedProductQuantity = 0

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

function addOrderBar() {
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
}

function cleanProductCards() {
    let children = productsContainer.getElementsByClassName('product-card')
    for (let i = children.length - 1; i > -1; i--) {
        productsContainer.removeChild(children[i])
    }
}

function setProductCardImage(product) {
    const cardImage = document.createElement('div')
    const coverContainer = document.createElement('div')
    const imageCover = document.createElement('img')
    coverContainer.classList.add('cover-container')
    cardImage.classList.add('product-card-image')
    cardImage.style.backgroundImage = 'url("' + product.image + '")'
    cardImage.alt = product.name + ' cover'
    imageCover.src = product.image
    imageCover.alt = product.name + ' cover'
    coverContainer.appendChild(imageCover)
    cardImage.appendChild(coverContainer)
    return cardImage
}

function setProductHeader(product) {
    const cardTitle = document.createElement('div')
    const cardText = document.createElement('p')
    cardTitle.classList.add('product-card-title')
    cardText.classList.add('product-card-text')
    cardTitle.innerHTML = product.name
    addToolTip(cardTitle, product.name)
    cardText.innerHTML = product.description
    return { cardTitle, cardText }
}

function setProductBottom(product) {
    const cardBottom = document.createElement('div')
    cardBottom.classList.add('product-card-bottom')
    const chipGroup = document.createElement('div')
    chipGroup.classList.add('chip-group')

    const chipType = document.createElement('p')
    const cardTextPrice = document.createElement('h4')
    const cardDivButton = document.createElement('div')
    const cardAddCartButton = document.createElement('button')

    cardAddCartButton.id = product.id + 'btn'
    cardAddCartButton.innerHTML = 'añadir'

    cardTextPrice.classList.add('product-card-price')
    cardDivButton.classList.add('btn-primary')

    chipType.innerHTML = product.type
    chipGroup.appendChild(chipType)

    cardBottom.appendChild(chipGroup)
    cardTextPrice.innerHTML = '$' + product.price
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

    cardAddCartButton.addEventListener('click', () => {
        const qtty = document.getElementById(product.id + 'qttyproduct')
        selectedProduct = product.id
        selectedProductQuantity = qtty.value
        fillProductView(product)
    })

    const divActions = document.createElement('div')
    divActions.classList.add('product-card-actions')
    const quantityButton = setQuantityButtons(product, 'product')
    divActions.appendChild(quantityButton)
    cardDivButton.appendChild(cardAddCartButton)
    divActions.appendChild(cardDivButton)
    cardBottom.appendChild(divActions)

    return cardBottom
}

function setProductCard(product) {
    const card = document.createElement('div')
    card.classList.add('product-card')
    const cardImage = setProductCardImage(product)
    const { cardTitle, cardText } = setProductHeader(product)
    const cardBottom = setProductBottom(product)
    card.appendChild(cardImage)
    card.appendChild(cardTitle)
    card.appendChild(cardText)
    card.appendChild(cardBottom)
    return card
}

async function chargeProductCards() {
    if (products.length > 0) {
        cleanProductCards()
        addOrderBar()
        products.forEach((product, index) => {
            const card = setProductCard(product)
            card.id = product.id + 'card' + index
            productsContainer.appendChild(card)
        })
        toastMessage('Productos cargados correctamente', 'primary')
    }
}

const windowProduct = document.getElementById('windowProduct');
/**
 * 
 * @param {Product} product 
 */
function fillProductView(product) {
    const viewBackgroundContainer = document.getElementById('viewBackgroundContainer');
    viewBackgroundContainer.style.backgroundImage = `url('${product.image}')`

    const viewCoverContainer = document.getElementById('viewCoverContainer');
    viewCoverContainer.style.backgroundImage = `url('${product.image}')`

    const viewTitle = document.getElementById('viewTitle');
    viewTitle.innerHTML = product.name

    const viewAuthor = document.getElementById('viewAuthor');
    viewAuthor.innerHTML = product.author

    const viewPrice = document.getElementById('viewPrice');
    viewPrice.innerHTML = '$' + product.price + (selectedProductQuantity > 0 ? (' x ' + selectedProductQuantity) : '')

    const viewChipGroup = document.getElementById('viewChipGroup');
    const viewChipType = document.createElement('p')
    viewChipType.innerHTML = product.type
    viewChipGroup.appendChild(viewChipType)
    const viewBtnReturn = document.getElementById('viewBtnReturn');
    const viewBtnAdd = document.getElementById('viewBtnAdd');
    const viewDescription = document.getElementById('viewDescription');

    viewDescription.innerHTML = product.description
    windowProduct.style.visibility = 'visible'
    windowProduct.style.opacity = '1'

    if (product.discount > 0) {
        viewPrice.style.textDecoration = 'line-through'

        const viewOffer = document.createElement('p')
        viewOffer.style.backgroundColor = 'var(--highlight-primary-bg-color-translucent)'
        viewOffer.innerHTML = 'oferta'
        const viewDiscount = document.getElementById('viewDiscount')
        viewDiscount.innerHTML = '-' + product.discount + '%'
        const viewPriceDiscount = document.getElementById('viewPriceDiscount');
        viewPriceDiscount.innerHTML = '$' + (product.price - ((product.price * product.discount / 100))).toFixed(2)

        viewChipGroup.appendChild(viewOffer)
    }

    viewBtnReturn.addEventListener('click', removeProductView)
    viewBtnAdd.addEventListener('click', addCartProduct)
    selectedProduct = product.id
}

function removeProductView() {
    windowProduct.style.visibility = 'hidden'
    windowProduct.style.opacity = '0'
    resetProductView()
}

function resetProductView() {
    const viewChipGroup = document.getElementById('viewChipGroup');
    const viewDiscount = document.getElementById('viewDiscount');
    const viewPriceDiscount = document.getElementById('viewPriceDiscount');
    const viewPrice = document.getElementById('viewPrice');
    const viewBtnAdd = document.getElementById('viewBtnAdd');
    viewBtnAdd.removeEventListener('click', addCartProduct)
    viewPrice.style.textDecoration = 'none'
    viewDiscount.innerHTML = ''
    viewPriceDiscount.innerHTML = ''
    viewChipGroup.innerHTML = ''
    selectedProduct = null
}

/**
 * @type CartService */
const cart = new CartService();
function addCartProduct() {
    const product = products.find(product => product.id === selectedProduct)
    cart.addToCart(product, selectedProductQuantity)
    selectedProduct = null
    selectedProductQuantity = 0
    chargeCart()
    toastMessage('Producto añadido al carrito', 'success')
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

const cartContainer = document.getElementById('cartContainer')
cartContainer.classList.add('cart-card-container')

let total = 0
const discountCode = 0

function applyDiscount(product) {
    const cardTextPriceDiscount = document.createElement('h4')
    cardTextPriceDiscount.classList.add('cart-card-price-discount')
    cardTextPriceDiscount.innerHTML = '$' + product.total
    cardTextPriceDiscount.style.textDecoration = 'line-through'
    const cardTextDiscount = document.createElement('h4')
    cardTextDiscount.classList.add('cart-card-discount')
    cardTextDiscount.innerHTML = '-' + product.discount + '%'
    return { cardTextPriceDiscount, cardTextDiscount }
}

function setCardImage(product) {
    const cardImage = document.createElement('div')
    const coverContainer = document.createElement('div')
    const imageCover = document.createElement('img')
    cardImage.classList.add('cart-card-image')
    coverContainer.classList.add('cover-container')
    cardImage.style.backgroundImage = 'url("' + product.image + '")'
    cardImage.alt = product.name + ' cover'
    imageCover.src = product.image
    imageCover.alt = product.name + ' cover'
    coverContainer.appendChild(imageCover)
    cardImage.appendChild(coverContainer)
    return cardImage
}

function setCardBody(product) {
    const cardSection = document.createElement('div')
    const cardTitle = document.createElement('div')
    const cardText = document.createElement('p')
    cardSection.classList.add('cart-card-section')
    cardTitle.classList.add('cart-card-title')
    cardText.classList.add('cart-card-text')
    cardTitle.innerHTML = product.name
    cardText.innerHTML = product.description
    cardSection.appendChild(cardTitle)
    cardSection.appendChild(cardText)
    return cardSection
}

// TODO: refactorizar
function setCardBottom(product) {
    let subtotal = ((product.total - ((product.total * (product.discount + discountCode) / 100)))).toFixed(2)
    total += parseFloat(subtotal)
    const cardBottom = document.createElement('div')
    const cardTextPriceContainer = document.createElement('div')
    const cardTextPrice = document.createElement('h4')
    const cardDivButton = setQuantityButtons(product, 'cart')
    cardBottom.classList.add('cart-card-tail')
    cardTextPriceContainer.classList.add('cart-card-price-container')
    cardTextPrice.classList.add('cart-card-price')
    cardTextPrice.id = product.id + 'price'
    cardTextPrice.innerHTML = '$' + parseFloat(subtotal).toFixed(2)
    cardBottom.appendChild(cardTextPrice)
    if (product.discount > 0) {
        const { cardTextPriceDiscount, cardTextDiscount } = applyDiscount(product)
        cardBottom.appendChild(cardTextPriceDiscount)
        cardBottom.appendChild(cardTextDiscount)
    }
    const removeContainer = document.createElement('div')
    removeContainer.classList.add('btn-delete')
    const cardRemove = document.createElement('button')
    cardRemove.classList.add('material-symbols-outlined')
    cardRemove.innerHTML = 'delete'
    cardRemove.id = product.id + 'delete'
    removeContainer.appendChild(cardRemove)
    cardBottom.appendChild(removeContainer)
    cardBottom.appendChild(cardDivButton)
    cardRemove.addEventListener('click', () => removeCartProduct(product.id))
    return cardBottom
}

//? refactorizar
function setQuantityButtons(product, suffix) {
    const cardDivButton = document.createElement('div')
    cardDivButton.classList.add('quantity-input')

    const cardPlusButton = document.createElement('button')
    cardPlusButton.classList.add('material-symbols-outlined')
    cardPlusButton.innerHTML = 'add'
    cardPlusButton.id = product.id + 'qtty' + suffix + 'Add'

    const cardMinusButton = document.createElement('button')
    cardMinusButton.classList.add('material-symbols-outlined')
    cardMinusButton.innerHTML = 'remove'
    cardMinusButton.id = product.id + 'qtty' + suffix + 'Remove'

    const cardAddCartButton = document.createElement('input')
    cardAddCartButton.type = 'number'
    cardAddCartButton.id = product.id + 'qtty' + suffix
    cardAddCartButton.placeholder = '0'
    cardAddCartButton.min = '0'
    cardAddCartButton.value = product.quantity

    cardDivButton.appendChild(cardPlusButton)
    cardDivButton.appendChild(cardAddCartButton)
    cardDivButton.appendChild(cardMinusButton)

    
    cardAddCartButton.addEventListener('change', () => {
        if (!isNaN(parseInt(cardAddCartButton.value)) && parseInt(cardAddCartButton.value) >= 0) {
            updateCart(product, parseInt(cardAddCartButton.value), suffix)
        }
    })

    cardMinusButton.addEventListener('click', () => {
        cardAddCartButton.stepDown()
        cardAddCartButton.dispatchEvent(new Event('change'))
    })
    
    cardPlusButton.addEventListener('click', () => {
        cardAddCartButton.stepUp()
        cardAddCartButton.dispatchEvent(new Event('change'))
    })

    return cardDivButton
}

function updateCart(product, value, suffix) {
    if (suffix === 'cart') {
        const cartProduct = cart.getCart().find(cartProduct => cartProduct.id === product.id)
        if (value <= 0) {
            removeCartProduct(cartProduct.id)
        } else {
            cart.updateProductQuantityCart(cartProduct.id, value)
        }
    } else {
        selectedProductQuantity = value
    }
    chargeCart()
}

function setCard(product) {
    const card = document.createElement('div')
    card.classList.add('cart-card')
    card.id = product.id + 'cart'
    const cardImage = setCardImage(product)
    const cardSection = setCardBody(product)
    const cardBottom = setCardBottom(product)
    card.appendChild(cardImage)
    card.appendChild(cardSection)
    card.appendChild(cardBottom)
    return card
}

function chargeCart() {
    cartContainer.innerHTML = ''
    const badge = document.getElementById('cartBadge')
    total = 0
    let _cart = cart.getCart()
    if (_cart.length > 0) {
        badge.style.visibility = 'visible'
        badge.innerHTML = _cart.length
        _cart.map(product => {
            const card = setCard(product)
            cartContainer.appendChild(card)
        })
    } else {
        badge.style.visibility = 'hidden'
        badge.innerHTML = _cart.length
        const card = document.createElement('div')
        card.classList.add('cart-card')
        const emptyCartText = document.createElement('h3')
        emptyCartText.innerHTML = 'No hay nada en tu carrito'
        card.appendChild(emptyCartText)
        cartContainer.appendChild(card)
    }
    document.getElementById('total').innerHTML = `$${total.toFixed(2)}`
}

function removeCartProduct(id) {
    cart.removeFromCart(id)
    chargeCart()
    toastMessage('Producto eliminado del carrito', 'success')
}

//#region coupon
function Coupon(name, discount, startDate, endDate) {
    return {
        name,
        discount,
        startDate,
        endDate
    }
}

/**
 * @constant {Coupon[]}
 */
const coupons = [
    Coupon("VERANO", 15, "2025-06-01", "2025-06-30"),
    Coupon("BLACKFRIDAY", 30, "2025-11-20", "2025-11-27"),
    Coupon("REBANUEVO10", 10, "2025-01-01", "2025-01-30"),
    Coupon("REBANUEVO25", 25, "2025-01-16", "2025-01-31"),
    Coupon("SEMANASANTA", 20, "2025-04-01", "2025-04-07"),
    Coupon("ELECTRONICA", 25, "2025-05-01", "2025-05-15")
]

/**
 * @const {Coupon[]}
 */
const appliedCoupons = []

const btnCoupon = document.getElementById('btnCoupon')

function couponChipGroup() {
    const couponChipG = document.getElementById('applied');
    if (appliedCoupons.length > 0) {
        let spanCoupons = couponChipG.getElementsByTagName('span')
        if (spanCoupons.length > 0 ) {
            for (let index = 0; index < spanCoupons.length; index++) {
                couponChipG.removeChild(index)
            }
        }
        appliedCoupons.forEach(coupon => {
            const chipCoupon = document.createElement('span')
            chipCoupon.classList.add('chip')
            chipCoupon.innerHTML = coupon.name + ' ' + coupon.discount + '%'
            couponChipG.appendChild(chipCoupon)
        })
    }
}

/**
 * 
btnCoupon.addEventListener('click', () => {
    const input = document.getElementById('coupon').value
    const isValidCoupon = Object.values(coupons).find((value) => {
        const sameName = value.name === input
        const today = (new Date()).getTime()
        const betweenDates = today < new Date(value.endDate).getTime() && today > new Date(value.startDate)
        return sameName && betweenDates
    })
    if (isValidCoupon) {
        desc = parseFloat(isValidCoupon.discount)
        appliedCoupons.push(isValidCoupon)
        couponChipGroup()
        createProductTable()
        toastMessage('Cupón aplicado correctamente', 'success')
    } else {
        toastMessage('Cupón no válido', 'error')
    }
});
 */
//#endregion

chargeCart()
chargeProductCards()