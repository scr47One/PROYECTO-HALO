const assert = require('assert');
const { describe, before, after } = require('mocha');
const { Builder, By, Browser, WebDriver } = require('selenium-webdriver');

describe('Vista de perfil de jugador', () => {
    /**
     * @type {WebDriver} driver
     */
    let driver;

    before(async () => {
        driver = new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('http://127.0.0.1:3000/src/views/components/stats/index.html');
        await driver.manage().setTimeouts({ implicit: 2500 });
    });

    it('Validar si se muestra el perfil de jugador con datos correctos', async () => {
        const input = await driver.findElement(By.id('gamertagInput'));
        await input.sendKeys('scr47');

        const button = await driver.findElement(By.id('search'));
        await button.click();

        await driver.sleep(3000);

        const profile = await driver.findElement(By.id('gamertag'));
        const text = await profile.getText();

        assert.strictEqual(text, 'SCR47', 'El perfil de jugador no es correcto');

        const isVisible = await profile.isDisplayed();
        assert.ok(isVisible, 'El perfil de jugador no se muestra');
    });

    after(() => {
        driver.quit();
    });
});