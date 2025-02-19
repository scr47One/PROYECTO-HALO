from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.remote.webdriver import WebDriver

class ProducPreview: 
    def __init__(self, driver: WebDriver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 11)
        self.add_to_cart_button = (By.ID, 'AddBtn1')
        self.window_product = (By.ID, 'windowProduct')
        self.window_product_element = False
        self.close_button = (By.ID, 'viewReturnBtn')
        self.add_btn = (By.ID, 'viewAddBtn')
    
    def show_preview(self):
        self.wait.until(EC.element_to_be_clickable(self.add_to_cart_button)).click()
        self.window_product_element = self.wait.until(EC.visibility_of_element_located(self.window_product))
        assert self.window_product_element.is_displayed(), "Preview window is not displayed"
        return self
    
    def add_to_cart(self):
        self.wait.until(EC.element_to_be_clickable(self.add_btn)).click()
        return self

    def close_preview(self):
        self.wait.until(EC.element_to_be_clickable(self.close_button)).click()
        assert self.window_product_element.is_displayed() == False, "Preview window is displayed"
        return self









