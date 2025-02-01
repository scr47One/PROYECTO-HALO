const assert = require('assert');
const { describe, before, after } = require('mocha');
const { Builder, By, Browser, WebDriver } = require('selenium-webdriver');

describe('Añadir productos al carrito', () => {
    /**
     * @type {WebDriver} driver
     */
    let driver;

    before(async () => {
        driver = new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('http://127.0.0.1:3000/src/views/components/store/index.html');
        await driver.manage().setTimeouts({ implicit: 2500 });
    });

    it('Añadir producto al carrito desde vista de productos', async () => {
        const button = await driver.findElement(By.id('1btn'));
        await button.click();

        const add = await driver.findElement(By.id('viewBtnAdd'));
        await add.click();

        const viewBtnReturn = await driver.findElement(By.id('viewBtnReturn'));
        await viewBtnReturn.click();

        const btnCart = await driver.findElement(By.css('.btn-cart'));
        await btnCart.click();

        await driver.sleep(200);
        const productPrice = await driver.findElement(By.id('1price'));
        const text = await productPrice.getText();

        assert.strictEqual(text, '$35.99', 'El precio del producto no es correcto');
        assert.notEqual(text, '$0.00', 'El precio del producto no es correcto')
        assert.notEqual(text, '', 'El precio del producto no es correcto')

    });

    it('Verificar el precio total del carrito', async () => {
        await driver.sleep(200);
        const total = await driver.findElement(By.id('total'));
        const text = await total.getText()

        assert.strictEqual(text, '$35.99', 'El total del carrito no es correcto');
        assert.notEqual(text, '$0.00', 'El precio del producto no es correcto')
        assert.notEqual(text, '', 'El precio del producto no es correcto')

    });

    it('Añadir producto al carrito desde el carrito', async () => {

        const btnAdd = await driver.findElement(By.id('1qttycartAdd'));
        await btnAdd.click();

        await driver.sleep(200);
        const productPrice = await driver.findElement(By.id('1price'));
        const text = await productPrice.getText();
        assert.strictEqual(text, '$71.98', 'El precio del producto no es correcto');
        assert.notEqual(text, '$0.00', 'El precio del producto no es correcto')
        assert.notEqual(text, '', 'El precio del producto no es correcto')

    });

    it('Verificar el precio total del carrito', async () => {
        const total = await driver.findElement(By.id('total'));
        const totalText = await total.getText()
        assert.strictEqual(totalText, '$71.98', 'El total del carrito no es correcto');
    });

    after(() => {
        driver.quit();
    });
});