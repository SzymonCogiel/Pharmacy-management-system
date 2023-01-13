from selenium import webdriver
from time import sleep

DRIVER_PATH = 'drivers/chromedriver.exe'
MAIL = 'cogiel@student.agh.edu.pl'
PASSWORD = 'najNowsxsfad'
BAD_PASSWORD = 'dasf'


if __name__ == "__main__":
    driver = webdriver.Chrome(DRIVER_PATH)
    driver.get("http://localhost:3000/login")

    try:
        span_element = driver.find_element('id', 'zaloguj')
        case = True
    except:
        case = False

    assert case

    try:
        driver.find_element('id', 'email').send_keys(MAIL)
    except:
        case = False

    assert case
    driver.find_element('id', 'password').send_keys(BAD_PASSWORD)
    driver.find_element('id', 'zaloguj').click()
    sleep(1)
    driver.find_element('id', 'zaloguj').click()
    sleep(0.5)
    driver.find_element('id', 'password').clear()
    sleep(0.5)
    driver.find_element('id', 'password').send_keys(PASSWORD)
    driver.find_element('id', 'zaloguj').click()
    sleep(1)
    driver.find_element('id', 'zaloguj').click()
    sleep(4)
    driver.find_element('id', 'logout_button').click()
    sleep(4)


