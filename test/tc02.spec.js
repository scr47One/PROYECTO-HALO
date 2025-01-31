const assert = require('assert');
const { Builder, By, Browser, WebDriver } = require('selenium-webdriver');

describe('Añadir producto al carrito', () => {
    /**
     * @type {WebDriver} driver
     */
    let driver;

    before(async () => {
        driver = new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('http://127.0.0.1:3000/src/views/components/store/index.html');
        await driver.manage().setTimeouts({ implicit: 2500 });
    });

    it('Añadir producto al carrito', async () => {
        const button = await driver.findElement(By.id('1btn'));
        await button.click();

        const add = await driver.findElement(By.id('viewBtnAdd'));
        await add.click();

        const productCart = await driver.findElement(By.id('1price'));
        productCart.getText().then((text) => {
            assert.strictEqual(text, '$35.99', 'El precio del producto no es correcto');
        });
    });

    it('Verificar el precio total del carrito', async () => {
        const total = await driver.findElement(By.id('total'));
        total.getText().then((text) => {
            assert.strictEqual(text, '$35.99', 'El total del carrito no es correcto');
        });
    });

    after(() => {
        driver.quit();
    });
});