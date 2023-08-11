import time
from selenium.webdriver.common.by import By

def turnOffMicCam(driver):
    driver=driver
    time.sleep(2)
    driver.find_element(By.XPATH, "//*[@id='yDmH0d']/c-wiz/div/div/div[9]/div[3]/div/div/div[2]/div/div[1]/div[1]/div[1]/div/div[4]/div[1]/div/div/div").click()
    driver.implicitly_wait(3000)
         #//*[@id="yDmH0d"]/c-wiz/div/div/div[9]/div[3]/div/div/div[2]/div/div[1]/div[1]/div[1]/div/div[4]/div[1]/div
    time.sleep(1)
    driver.find_element(By.XPATH, 
        "//*[@id='yDmH0d']/c-wiz/div/div/div[9]/div[3]/div/div/div[2]/div/div[1]/div[1]/div[1]/div/div[4]/div[2]/div/div").click()
    driver.implicitly_wait(3000)

def AskToJoin(driver):
    # Ask to Join meet
    driver=driver
    time.sleep(5)
    driver.implicitly_wait(2000)
    driver.find_element(By.XPATH,'/html/body/div[1]/c-wiz/div/div/div[14]/div[3]/div/div[2]/div[4]/div/div/div[2]/div[1]/div[2]/div[1]/div[1]/button/span').click()

def Glogin(mail_address, password,driver):
    driver=driver
    # Login Page
    driver.get(
        'https://accounts.google.com/ServiceLogin?hl=en&passive=true&continue=https://www.google.com/&ec=GAZAAQ')

    # input Gmail
    driver.find_element(By.ID,"identifierId").send_keys(mail_address)
    driver.find_element(By.ID,"identifierNext").click()
    driver.implicitly_wait(10)

    # input Password
    driver.find_element(By.XPATH, 
        '//*[@id="password"]/div[1]/div/div[1]/input').send_keys(password)
    driver.implicitly_wait(10)
    driver.find_element(By.ID,"passwordNext").click()
    driver.implicitly_wait(10)

    # go to google home page
    driver.get('https://google.com/')
    driver.implicitly_wait(100)

def joinNow(driver):
    # Join meet
    driver=driver
    time.sleep(5)
    driver.find_element(By.XPATH,'/html/body/div[1]/c-wiz/div/div/div[14]/div[3]/div/div[2]/div[4]/div/div/div[2]/div[1]/div[2]/div[1]/div[1]/button/span').click()
    driver.implicitly_wait(2000)
    #driver.find_element(By.CSS_SELECTOR,'div.uArJ5e.UQuaGc.Y5sE8d.uyXBBb.xKiqt').click()
    print("Meeting Joined Successfully")