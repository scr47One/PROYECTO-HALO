const assert = require('assert');
const { Builder, By, Browser, WebDriver } = require('selenium-webdriver');

describe('Agregar y eliminar producto del carrito', () => {
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

        const viewBtnReturn = await driver.findElement(By.id('viewBtnReturn'));
        await viewBtnReturn.click();

        const btnCart = await driver.findElement(By.css('.btn-cart'));
        await btnCart.click();

        const productCart = await driver.findElement(By.id('1price'));
        const text = await productCart.getText()
        assert.strictEqual(text, '$35.99', 'El precio del producto no es correcto');
    });

    it('Verificar el precio total del carrito', async () => {
        const total = await driver.findElement(By.id('total'));
        const text = await total.getText()
        assert.strictEqual(text, '$35.99', 'El total del carrito no es correcto');
    });

    it('Eliminar producto del carrito y verificar si se actualizó el total', async () => {
        const deleteBtn = await driver.findElement(By.id('1delete'));
        await deleteBtn.click();

        const total = await driver.findElement(By.id('total'));
        const text = await total.getText()
        assert.strictEqual(text, '$0.00', 'El total del carrito no es correcto');
    });

    after(() => {
        driver.quit();
    });
});