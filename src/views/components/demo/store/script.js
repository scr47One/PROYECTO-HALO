let desc = 0

//#region productos
function Product(id, nombre, descripcion, precio, imagen, descuento) {
    return {
        id,
        nombre,
        descripcion,
        precio,
        imagen,
        descuento
    }
}

const productos = [
    Product(1, "Laptop", "Laptop gaming con 16GB de RAM y 1TB de almacenamiento", 1500, 'https://images.placeholders.dev/?width=600&height=400',10),
    Product(2, "Smartphone", "Smartphone de última generación con cámara 108MP", 800, 'https://images.placeholders.dev/?width=600&height=400',5),
    Product(3, "Auriculares", "Auriculares inalámbricos con cancelación de ruido", 200, 'https://images.placeholders.dev/?width=600&height=400',0),
    Product(4, "Smartwatch", "Reloj inteligente con monitoreo de salud", 120, 'https://images.placeholders.dev/?width=600&height=400',20),
    Product(5, "Cámara", "Cámara réflex digital con lente 18-55mm", 600, 'https://images.placeholders.dev/?width=600&height=400',0),
    Product(6, "Teclado", "Teclado mecánico retroiluminado para gaming", 100, 'https://images.placeholders.dev/?width=600&height=400',15),
    Product(7, "Ratón", "Ratón ergonómico inalámbrico con sensor de alta precisión", 50, 'https://images.placeholders.dev/?width=600&height=400',30),
    Product(8, "Monitor", "Monitor 4K de 27 pulgadas con tecnología IPS", 400, 'https://images.placeholders.dev/?width=600&height=400',8),
    Product(9, "Auriculares Bluetooth", "Auriculares Bluetooth deportivos con micrófono incorporado", 80, 'https://images.placeholders.dev/?width=600&height=400',25),
    Product(10, "Cargador portátil", "Cargador portátil de 10000mAh con carga rápida", 30, 'https://images.placeholders.dev/?width=600&height=400',50),
    Product(11, "Disco duro externo", "Disco duro externo de 2TB con conexión USB 3.0", 70, 'https://images.placeholders.dev/?width=600&height=400',12),
    Product(12, "Altavoces", "Altavoces Bluetooth con sonido envolvente y base de carga", 150, 'https://images.placeholders.dev/?width=600&height=400',6),
    Product(13, "Lentes VR", "Lentes de realidad virtual para consola y PC", 350, 'https://images.placeholders.dev/?width=600&height=400',3),
    Product(14, "Pluma digital", "Pluma digital para diseño gráfico y edición en tabletas", 120, 'https://images.placeholders.dev/?width=600&height=400',40),
    Product(15, "Cable HDMI", "Cable HDMI de alta velocidad 4K", 15, 'https://images.placeholders.dev/?width=600&height=400',20),
    Product(16, "Proyector", "Proyector portátil 1080p con conexión inalámbrica", 450, 'https://images.placeholders.dev/?width=600&height=400',7),
    Product(17, "Micrófono", "Micrófono USB de alta calidad para grabación y streaming", 90, 'https://images.placeholders.dev/?width=600&height=400',18),
    Product(18, "Silla gaming", "Silla ergonómica para gaming con soporte lumbar ajustable", 250, 'https://images.placeholders.dev/?width=600&height=400',5),
    Product(19, "Dispositivo de streaming", "Dispositivo de streaming 4K para televisores", 60, 'https://images.placeholders.dev/?width=600&height=400',22),
    Product(20, "Reloj inteligente", "Reloj inteligente con GPS y monitoreo de actividad física", 250, 'https://images.placeholders.dev/?width=600&height=400',10)
];

let tempProductos = productos

const div = document.getElementById('app')

function createProductTable() {
    let table;
    if (!document.getElementById('product')) {
        table = document.createElement('table')
        table.classList.add('table')
        table.id = 'product'
        const hRow = table.insertRow()
        hRow.classList.add('header-product')
        const headers = [...Object.keys(productos[0]), 'Cantidad', 'Añadir']
        headers.forEach((entry, index) => {
            const hCell = hRow.insertCell(index)
            hCell.classList.add('h-cell')
            hCell.innerHTML = entry
            switch(entry) {
                case 'id': addOrderBy(hCell,'id')
                break
                case 'precio': addOrderBy(hCell,'precio')
                break
                case 'descuento': addOrderBy(hCell,'descuento')
                break
                case 'nombre': addOrderBy(hCell,'nombre')
                break
            }
        })
    } else {
        table = document.getElementById('product')
        var filas = table.getElementsByTagName('tr')
        for (var i = filas.length - 1; i > 0; i--) {
            table.deleteRow(i)
        }
    }

    let total = 0
    let totalDesc = 0

    tempProductos.map(producto => {
        const row = table.insertRow()
        const cantidadDescDirecto = (producto.precio * (producto.descuento / 100)).toFixed(2)
        Object.values(producto).forEach((value, index) => {
            const cell = row.insertCell(index)
            const currentIndex = Object.keys(producto)[index]
            switch (currentIndex) {
                case 'descuento':
                    value = `${desc > 0 ? desc + '%' : ''}${desc > 0 && producto.descuento ? ' + ' : ''}${producto.descuento > 0 ? producto.descuento + '%' : ''}`
                    totalDesc += parseFloat(cantidadDescDirecto)
                    total += parseFloat(producto.precio - cantidadDescDirecto)
                    break;
                case 'precio':
                    value = '$' + producto.precio
                    break
            }
            cell.innerHTML = value
        })
        //#region Acciones
        const btnCant = row.insertCell()
        const input = document.createElement('input')
        input.type = 'number'
        input.required = true
        input.defaultValue = 0
        input.id = 'c' + producto.id
        input.classList.add('input')
        btnCant.appendChild(input)

        const btnCell = row.insertCell()
        const button = document.createElement('button')
        button.innerHTML = 'Añadir'
        button.classList.add('btn-add')
        button.id = producto.id
        button.type = 'button'
        btnCell.appendChild(button)

        button.addEventListener('click', () => {
            let cantidad = document.getElementById('c' + producto.id).value;
            addCartProduct(producto.id, cantidad <= 0 ? 1 : cantidad);
        });
        //#endregion
    })

    div.appendChild(table)
}

/**
 * 
 * @param {*} htmlElement 
 * @param {string} value 
 */
function addOrderBy(htmlElement, value) {
    const orderBtn = document.createElement('input')
    orderBtn.type = 'checkbox'
    orderBtn.style.visibility = 'hidden'
    orderBtn.id = 'btnOrderProductPrice-'+value

    const labelOrdrBtn = document.createElement('label')
    labelOrdrBtn.htmlFor = 'btnOrderProductPrice-'+value
    labelOrdrBtn.classList.add('btn-order')
    labelOrdrBtn.classList.add('material-icons')
    labelOrdrBtn.innerHTML = 'arrow_downward'

    htmlElement.appendChild(orderBtn)
    htmlElement.appendChild(labelOrdrBtn)

    orderBtn.addEventListener('click', () => {
        labelOrdrBtn.innerHTML = orderBtn.checked ? 'arrow_upward' : 'arrow_downward'
        tempProductos = orderBtn.checked ? quickSort(productos, value) : (quickSort(productos, value)).reverse()
        createProductTable()
    })
}

createProductTable()
//#endregion



//#region cart
const cart = []

function addCartProduct(id, cantidad) {
    const prodExist = cart.findIndex(producto => producto.id === id)
    if (prodExist !== -1 && cart.length > 0) {
        cart[prodExist].cantidad = parseInt(cart[prodExist].cantidad) + parseInt(cantidad)
    } else {
        cart.push({ ...productos.find(producto => producto.id === id), total: 0, cantidad })
    }
    createCartTable()
}
const cartContainer = document.getElementById('cartContainer')

function createCartTable() {
    let table = null;
    if (!document.getElementById('cart')) {
        table = document.createElement('table')
        table.id = 'cart'
        table.classList.add('table')
        const hRow = table.insertRow()
        const headers = [...Object.keys(productos[0]), 'total', 'cantidad']
        headers.forEach((entry, index) => {
            const hCell = hRow.insertCell(index)
            hCell.classList.add('h-cell')
            hCell.innerHTML = entry
        })
    } else {
        table = document.getElementById('cart')
        var filas = table.getElementsByTagName('tr')
        for (var i = filas.length - 1; i > 0; i--) {
            table.deleteRow(i)
        }
    }
    if (cart.length > 0) {
        let total = 0
        let totalDesc = 0
        cart.map(producto => {
            const row = table.insertRow()
            const productoCant = parseFloat((producto.precio * producto.cantidad).toFixed(2))
            const cantidadDesc = parseFloat((producto.precio * ((producto.descuento + desc) / 100) * producto.cantidad).toFixed(2))
            total += productoCant
            totalDesc += cantidadDesc
            Object.values(producto).forEach((value, index) => {
                const cell = row.insertCell(index)
                const currentIndex = Object.keys(producto)[index]
                switch (currentIndex) {
                    case 'total':
                        value = '$' + (productoCant - cantidadDesc)
                        break
                    case 'descuento':
                        value = '$' + cantidadDesc
                        break
                    case 'precio':
                        value = '$' + productoCant + ' - ' + (producto.descuento + desc) + '%'
                        break
                }
                cell.innerHTML = value
            })
        })

        const totalSpan = document.getElementById('total')
        const totalDescSpan = document.getElementById('totalDiscount')
        totalSpan.innerHTML = (total - totalDesc)
        totalDescSpan.innerHTML = totalDesc
    }
    cartContainer.appendChild(table)
}

createCartTable();
//#endregion


function quickSort(arr, value) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[arr.length - 1];

    const left = [];
    const right = [];
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i][value] < pivot[value]) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSort(left, value), pivot, ...quickSort(right, value)];
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
//#endregion




//#region toast
const ToastTypes = [
    {
        name: 'primary',
        color: 'var(--primary-color)'
    },
    {
        name: 'success',
        color: 'var(--success-color)'
    },
    {
        name: 'error',
        color: 'var(--error-color)'
    }
]

/**
 * 
 * @param {string} message 
 * @param {'primary'|'success'|'error'} type 
 */

function toastMessage(message, type) {
    const toast = document.getElementById('toast')
    const toastType = ToastTypes.find(toastType => toastType.name === type)
    toast.style.backgroundColor = toastType ? toastType.color : ToastTypes.find(toastType => toastType.name === 'primary').color
    toast.style.width = 'var(--min-input-width)'
    toast.style.bottom = '40px'
    toast.style.padding = '20px'
    toast.style.visibility = 'visible'

    const toastMessage = document.getElementById('toastMessage')
    toastMessage.innerHTML = message
    setTimeout(() => {
        toast.style.width = '0'
        toast.style.bottom = '-40px'
        toastMessage.innerHTML = ''
        toast.style.visibility = 'hidden'
    }, 2000);
}
//#endregion
