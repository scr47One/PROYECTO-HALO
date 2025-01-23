import {ProductService} from '../../../../../services/product-service.js'

const productService = new ProductService()
const productsContainer = document.getElementById('products')

async function chargeProductCards() {
    const products = await productService.getProducts()
    if (products) {
        products.forEach(product => {
            //card
            const card = document.createElement('div')
            card.classList.add('card')
            const cardContent = document.createElement('div')
            card.classList.add('card-content')
            //content
            const cardTitle = document.createElement('h4')
            cardTitle.classList.add('card-title')
            cardTitle.innerHTML = product.name

            const cardText = document.createElement('p')
            cardTitle.classList.add('card-text')
            cardText.innerHTML = product.description

            const chipType = document.createElement('span')
            chipType.classList.add('chip')
            chipType.innerHTML = product.type

            const cardImage = document.createElement('img')
            cardImage.classList.add('card-image')
            cardImage.alt = product.name + ' cover'
            cardImage.src = product.image

            const cardTextPrice = document.createElement('h3')
            cardTextPrice.classList.add('price')
            cardTextPrice.innerHTML = product.price

            card.appendChild(cardImage)

            card.appendChild(cardTitle)
            card.appendChild(cardText)
            card.appendChild(chipType)
            card.appendChild(cardTextPrice)
            productsContainer.appendChild(card)
        })
    }
}

chargeProductCards()