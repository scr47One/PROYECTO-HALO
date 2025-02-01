const assert = require('assert');
const { describe, before, after } = require('mocha');
const { Builder, By, Browser, WebDriver } = require('selenium-webdriver');

describe('Vista previa del producto', () => {
    /**
     * @type {WebDriver} driver
     */
    let driver;

    before(async () => {
        driver = new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('http://127.0.0.1:3000/src/views/components/store/index.html');
        await driver.manage().setTimeouts({ implicit: 2500 });
    });

    it('Mostrar vista previa del producto', async () => {
        const id = '1btn'
        const button = await driver.findElement(By.id(id));
        await button.click();
        await driver.sleep(100);
        const preview = await driver.findElement(By.id('windowProduct'));
        const isVisible = await preview.isDisplayed();
        assert.ok(isVisible, 'La vista previa del producto no se muestra');
    });

    it('Cerrar vista previa del producto', async () => {
        const viewBtnReturn = await driver.findElement(By.id('viewBtnReturn'));
        await viewBtnReturn.click();
        const preview = await driver.findElement(By.id('windowProduct'));
        const isVisible = await preview.isDisplayed();
        assert.ok(!isVisible, 'La vista previa del producto no se cierra');
    });

    after(() => {
        driver.quit();
    });
});