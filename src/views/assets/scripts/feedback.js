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
    toast.style.width = 'fit-content'
    toast.style.bottom = '40px'
    toast.style.padding = '10px'
    toast.style.visibility = 'visible'

    const toastMessage = document.getElementById('toastMessage')
    toastMessage.innerHTML = message
    setTimeout(() => {
        toast.style.width = '0'
        toast.style.padding = '0'
        toast.style.bottom = '-40px'
        toast.style.visibility = 'hidden'
        toastMessage.innerHTML = ''
    }, 3000);
}
//#endregion

let errors = {
    name: true,
    email: true,
    message: true
}

document.getElementById('contact-form').addEventListener('submit', function (event) {

    if (errors.name || errors.email || errors.message) {
        event.preventDefault()
        toastMessage('Revisar los campos', 'error')
        return
    } else {
        event.preventDefault();
        toastMessage('Mensaje enviado', 'success')
        /*
        emailjs.sendForm('service_x9r3r47', 'template_ji9acld', this)
            .then(() => {
                toastMessage('Mensaje enviado', 'success')
            }, (error) => {
                console.error(error)
                toastMessage('Error al enviar el mensaje', 'error')
            });*/
    }
});

document.getElementById('contact-name').addEventListener('reset', function () {
    clearForm()
})

function clearForm() {
    document.getElementById('contact-name').value = ''
    document.getElementById('contact-email').value = ''
    document.getElementById('contact-message').value = ''
    const [nameError, emailError, messageError] = getErrorElements()
    nameError.innerHTML = ''
    emailError.innerHTML = ''
    messageError.innerHTML = ''
    errors = {
        name: true,
        email: true,
        message: true
    }
}

const nameValidation = () =>
    [
        name => name.length >= 3 || 'El nombre debe tener al menos 3 caracteres',
        name => (name.length <= 50) || 'El nombre debe tener menos de 50 caracteres',
        name => /^[a-zA-Z\s]*$/.test(name) || 'El nombre solo puede contener letras y espacios'
    ]

const emailValidation = () =>
    [
        email => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email) || 'El correo no es válido',
        email => email.length >= 6 || 'El correo debe tener al menos 6 caracteres',
        email => email.length <= 100 || 'El correo debe tener menos de 100 caracteres'
    ]

const messageValidation = () =>
    [
        message => message.length >= 10 || 'El mensaje debe tener al menos 10 caracteres',
        message => message.length <= 500 || 'El mensaje debe tener menos de 500 caracteres',
        message => /^[a-zA-Z0-9\s.,;:()¿?¡!]*$/.test(message) || 'El mensaje solo puede contener letras, números y signos de puntuación'
    ]

function setValidationRulesListeners() {

    const [nameError, emailError, messageError] = getErrorElements()
    const [name, email, message] = getInputs()

    name.addEventListener('input', () => {
        nameError.innerHTML = ''
        const errorsName = nameValidation().filter(validation => typeof validation(name.value) === 'string').map(validation => validation(name.value))
        nameError.innerHTML = errorsName[0] || ''
        errors.name = errorsName[0]
    })

    email.addEventListener('input', () => {
        emailError.innerHTML = ''
        const errorsEmail = emailValidation().filter(validation => typeof validation(email.value) === 'string').map(validation => validation(email.value))
        emailError.innerHTML = errorsEmail[0] || ''
        errors.email = errorsEmail[0]
    })

    message.addEventListener('input', () => {
        messageError.innerHTML = ''
        const errorsMessage = messageValidation().filter(validation => typeof validation(message.value) === 'string').map(validation => validation(message.value))
        messageError.innerHTML = errorsMessage[0] || ''
        errors.message = errorsMessage[0]
    })
}

function getInputs() {
    return [
        document.getElementById('contact-name'),
        document.getElementById('contact-email'),
        document.getElementById('contact-message')
    ]
}

function getErrorElements() {
    return [
        document.getElementById('nameError'),
        document.getElementById('emailError'),
        document.getElementById('messageError')
    ]
}

setValidationRulesListeners()

export { toastMessage }