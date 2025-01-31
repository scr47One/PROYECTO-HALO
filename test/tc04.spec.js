const assert = require('assert');
const { describe, before, after } = require('mocha');
const { Builder, By, Browser, WebDriver } = require('selenium-webdriver');

describe('Validación y envío de formulario de contacto', () => {
    /**
     * @type {WebDriver} driver
     */
    let driver;

    before(async () => {
        driver = new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('http://127.0.0.1:3000/src/views/index.html');
        await driver.manage().setTimeouts({ implicit: 2500 });
    });

    it('Validar formulario de contacto con datos incorrectos', async () => {
        const name = await driver.findElement(By.id('contact-name'));
        await name.clear();
        await name.sendKeys('Na');

        const nameError = await driver.findElement(By.id('nameError'));
        assert.strictEqual(await nameError.getText(), 'El nombre debe tener al menos 3 caracteres', 'El mensaje de error no aparece o no es correcto');

        const email = await driver.findElement(By.id('contact-email'));
        await email.clear();
        await email.sendKeys('correo@correo');

        const emailError = await driver.findElement(By.id('emailError'));
        const emailErrorText = await emailError.getText();
        assert.strictEqual(emailErrorText, 'El correo no es válido', 'El mensaje de error no aparece o no es correcto');

        const message = await driver.findElement(By.id('contact-message'));
        await message.clear();
        await message.sendKeys('Mensaje');

        const messageError = await driver.findElement(By.id('messageError'));
        const messageErrorText = await messageError.getText();
        assert.strictEqual(messageErrorText, 'El mensaje debe tener al menos 10 caracteres', 'El mensaje de error no aparece o no es correcto');

        const submit = await driver.findElement(By.css('input[type="submit"]'));
        await submit.click();
    });

    it('Validar formulario de contacto con datos correctos', async () => {
        const name = await driver.findElement(By.id('contact-name'));
        await name.clear();
        await name.sendKeys('Nombre');

        const nameError = await driver.findElement(By.id('nameError'));
        assert.strictEqual(await nameError.getText(), '', 'No se esperaba un mensaje de error');

        const email = await driver.findElement(By.id('contact-email'));
        await email.clear();
        await email.sendKeys('correo@correo.com');

        const emailError = await driver.findElement(By.id('emailError'));
        const emailErrorText = await emailError.getText();
        assert.strictEqual(emailErrorText, '', 'No se esperaba un mensaje de error');


        const message = await driver.findElement(By.id('contact-message'));
        await message.clear();
        await message.sendKeys('Mensaje de prueba');
        
        const messageError = await driver.findElement(By.id('messageError'));
        const messageErrorText = await messageError.getText();
        assert.strictEqual(messageErrorText, '', 'No se esperaba un mensaje de error');

        const submit = await driver.findElement(By.css('input[type="submit"]'));
        await submit.click();
    });

    after(() => {
        driver.quit();
    });
});