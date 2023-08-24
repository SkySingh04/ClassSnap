from time import time, sleep
import cv2
import numpy as np
import pyautogui
import sys
import pyaudio
import wave
import threading


from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.chrome.service import Service

from functions.login import Glogin, joinNow
from functions.screenshots import screenshot

# For NotesGeneration
from functions.text_extractor import extract_text
from functions.text_summarizer import summarise
from functions.generate_pdf import create_pdf


# Chrome driver configs
chrome_options = Options()
chrome_options.add_argument("--disable-infobars")
chrome_options.add_argument("--mute-audio")
chrome_options.add_argument("start-maximized")
chrome_options.add_argument("enable-usermedia-screen-capturing")
chrome_options.add_argument("--disable-notifications")
chrome_options.add_experimental_option("excludeSwitches", ["test-type"])
chrome_options.add_experimental_option(
    "prefs",
    {
        "profile.default_content_setting_values.media_stream_mic": 1,
        "profile.default_content_setting_values.media_stream_camera": 1,
        "profile.default_content_setting_values.geolocation": 1,
        "profile.default_content_setting_values.notifications": 1,
    },
)


def meetingStart():
    record_video()

    global meeting_end
    while meeting_end == False:
        sleep(5)
        try:
            WebDriverWait(driver, 10).until(EC.alert_is_present())
            alert = driver.switch_to.alert
            alert.accept()
            print("Notification popup accepted")
        except Exception as e:
            print("No notification popup found")

    print("MeetingEnded")
    driver.close()
    
    time.sleep(5)
    
    extract_text(r"NotesGeneration\assets\python_100_sec.mp4")
    summarise("NotesGeneration/Output/audio_text.txt")
    create_pdf("NotesGeneration/Output/summarized.txt")

#record audio
def record_audio(audio_frames):
    audio_recorder = pyaudio.PyAudio()

    audio_stream = audio_recorder.open(
        format=pyaudio.paInt16,
        channels=2,
        rate=44100,
        input=True,
        frames_per_buffer=1024,
    )

    while not meeting_end:
        audio_data = audio_stream.read(1024)
        audio_frames.append(audio_data)

    audio_stream.stop_stream()
    audio_stream.close()
    audio_recorder.terminate()


def record_video():
    codec = cv2.VideoWriter_fourcc(*"XVID")

    out = cv2.VideoWriter(
        "Recorded.avi", codec, 19, (1920, 1080)
    )  # Here screen resolution is 1366 x 768, you can change it depending upon your need

    cv2.namedWindow("Recording", cv2.WINDOW_NORMAL)
    cv2.resizeWindow(
        "Recording", 480, 270
    )  # Here we are resizing the window to 480x270 so that the program doesn't run in full screen in the beginning

    audio_frames = []
    audio_thread = threading.Thread(target=record_audio, args=(audio_frames,))
    audio_thread.start()

    global meeting_end
    while meeting_end == False:
        img = pyautogui.screenshot()  # capturing screenshot
        frame = np.array(img)  # converting the image into numpy array representation
        frame = cv2.cvtColor(
            frame, cv2.COLOR_BGR2RGB
        )  # converting the BGR image into RGB image
        out.write(frame)  # writing the RBG image to file
        cv2.imshow("Recording", frame)  # display screen/frame being recorded
        if cv2.waitKey(1) == ord(
            "q"
        ):  # Wait for the user to press 'q' key to stop the recording
            break

    out.release()  # closing the video file
    cv2.destroyAllWindows()  # destroying the recording window

     # Save audio frames to a WAV file
    audio_recording = b"".join(audio_frames)
    with wave.open("RecordedAudio.wav", "wb") as audio_file:
        audio_file.setnchannels(2)
        audio_file.setsampwidth(2)
        audio_file.setframerate(44100)
        audio_file.writeframes(audio_recording)


# ADD CREDENTIALS OF BOT HERE
CREDS = {"email": sys.argv[1], "passwd": sys.argv[2]}
name = sys.argv[4]
meeting_id = sys.argv[3]
meeting_end = False
usn=sys.argv[5]

# chromedriver added to the repo
service = Service(r"chromedriver.exe")
driver = webdriver.Chrome(service=service)


Glogin(CREDS["email"], CREDS["passwd"], driver)
driver.get("https://meet.google.com/" + meeting_id)

driver.implicitly_wait(5)
driver.find_element(
    By.XPATH,
    "/html/body/div/div[3]/div[2]/div/div/div/div/div[2]/div/div[2]/button/span",
).click()
driver.implicitly_wait(15)
joinNow(driver)

driver.implicitly_wait(5)
try:
    WebDriverWait(driver, 6).until(
        EC.alert_is_present(),
        "Timed out waiting for PA creation " + "confirmation popup to appear.",
    )

    alert = driver.switch_to.alert
    alert.accept()
    print("alert accepted")
except:
    print("no alert")
driver.implicitly_wait(5)

meetingStart()
