
#TEST CASE
from selenium import webdriver
from productPreview import ProducPreview

driver = webdriver.Chrome()
driver.get('http://127.0.0.1:3000/src/views/components/store/index.html')
driver.maximize_window()


product_preview = ProducPreview(driver)

product_preview.show_preview()
product_preview.add_to_cart()
product_preview.close_preview()