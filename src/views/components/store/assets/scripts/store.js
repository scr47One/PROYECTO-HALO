import { ProductService } from '../../../../../services/product-service.js'
import { Product } from '../../../../../model/product.js'

const productService = new ProductService()
const productsContainer = document.getElementById('products')

function addToolTip(element, message) {
    const tooltip = document.createElement('span')
    tooltip.classList.add('tooltiptext')
    tooltip.innerHTML = message
    element.classList.add('tooltip')
    element.appendChild(tooltip)
}

async function chargeProductCards() {
    const products = await productService.getProducts()
    if (products) {
        products.forEach(product => {
            //card
            const card = document.createElement('div')
            card.classList.add('product-card')
            //content
            const cardTitle = document.createElement('div')
            cardTitle.classList.add('product-card-title')
            cardTitle.innerHTML = product.name
            addToolTip(cardTitle, product.name)


            const cardText = document.createElement('p')
            cardTitle.classList.add('card-text')
            cardText.innerHTML = product.description

            const chipType = document.createElement('div')
            chipType.classList.add('chip')
            chipType.innerHTML = product.type

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

            const cardTextPrice = document.createElement('h4')
            cardTextPrice.classList.add('product-card-price')
            cardTextPrice.innerHTML = '$' + product.price
            cardBottom.appendChild(cardTextPrice)
            
            if (product.discount > 0) {
                cardTextPrice.style.textDecoration = 'line-through'
                const cardTextPriceDiscount = document.createElement('h4')
                cardTextPriceDiscount.classList.add('product-card-price-discount')
                cardTextPriceDiscount.innerHTML = '$' + (product.price - (product.price * (product.discount / 100))).toFixed(0)

                const cardTextDiscount = document.createElement('h4')
                cardTextDiscount.classList.add('product-card-discount')
                cardTextDiscount.innerHTML = '-' + product.discount + '%'

                cardBottom.appendChild(cardTextPriceDiscount)
                cardBottom.appendChild(cardTextDiscount)
            }

            const cardDivButton = document.createElement('div')
            cardDivButton.classList.add('btn-primary')
            const cardAddCartButton = document.createElement('button')
            cardAddCartButton.innerHTML = 'añadir'

            cardDivButton.appendChild(cardAddCartButton)
            cardBottom.appendChild(cardDivButton)
            //#endregion

            card.appendChild(cardImage)
            card.appendChild(cardTitle)
            card.appendChild(cardText)
            card.appendChild(chipType)
            card.appendChild(cardBottom)
            productsContainer.appendChild(card)
        })
    }
}
/** @type Product[] */
const cart = []

async function chargeCart() {
    const cartContainer = document.getElementById('side-bar')
    if (cart.length > 0) {
        cart.map(product => {
            
        })
    }
}

chargeCart()
chargeProductCards()