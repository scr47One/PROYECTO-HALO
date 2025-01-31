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
        toast.style.bottom = '-40px'
        toastMessage.innerHTML = ''
        toast.style.visibility = 'hidden'
    }, 3000);
}
//#endregion

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    emailjs.sendForm('service_x9r3r47', 'template_ji9acld', this)
        .then(() => {
            toastMessage('Mensaje enviado', 'success')
        }, (error) => {
            console.error(error)
            toastMessage('Error al enviar el mensaje', 'error')	
        });
});

export { toastMessage }