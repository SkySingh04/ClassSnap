# call extract_text(video_path) function to extract text from video and save it to a file.
import cv2
import pytesseract

from moviepy.editor import VideoFileClip
import assemblyai as aai
import os
from dotenv import load_dotenv


# Getting API token from .env file
load_dotenv()
MY_ENV_VAR = os.getenv('AAI_API_KEY')
aai.settings.api_key = MY_ENV_VAR


def audio_to_text(video_path: str) -> None:
    """Convwer audio to text using AssemblyAI API and save it to a file.

    Args:
        video (str): Path to video file.
    """
        
    # Load the video file
    video = VideoFileClip(video_path)
    # Extract the audio from the video
    audio = video.audio
    # Save the audio to a file
    audio.write_audiofile("audio.wav")


    # Create a transcriber object.
    transcriber = aai.Transcriber()


    transcript = transcriber.transcribe("audio.wav")


    # transcript = transcriber.transcribe("https://storage.googleapis.com/aai-web-samples/espn-bears.m4a")

    with open("audio_text.txt", "w") as f:
        f.write(transcript.text)


# --- From Video File ---
def write_to_file(text):
    with open("video_text.txt", "a") as f:
        f.write(text)
        f.write("\n")


def video_to_text(video_path: str) -> None:
    """Use RAW STRING `(r"")` for video_path (i.e. `r"folder\\file"`)

    Args:
        video_path (str): Path of the video file
    """

    #! Path to Tesseract executable
    pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

    # Open the video file
    cap = cv2.VideoCapture(fr"{video_path}")
    open("video_text.txt", "w").close()


    # Read the first frame
    success, prev_frame = cap.read()
    if success:
        gray_frame = cv2.cvtColor(prev_frame, cv2.COLOR_BGR2GRAY)
        text = pytesseract.image_to_string(gray_frame)
        print(text)
        write_to_file(text)
    if not success:
        print("Unable to read frame")
        exit()


    # Loop until the end of the video
    while True:
        success, curr_frame = cap.read()
        if not success:
            print("Unable to read frame")
            break

        # Calculate the absolute difference between the current and previous frames
        diff = cv2.absdiff(curr_frame, prev_frame)

        # Convert the difference image to grayscale
        gray = cv2.cvtColor(diff, cv2.COLOR_BGR2GRAY)

        # Apply thresholding to remove noise
        thresh = cv2.threshold(gray, 25, 255, cv2.THRESH_BINARY)[1]

        # Calculate the percentage of the frame that has changed
        num_pixels = thresh.shape[0] * thresh.shape[1]
        num_changed_pixels = cv2.countNonZero(thresh)
        percent_changed = num_changed_pixels / num_pixels * 100

        # Check if the percentage of changed pixels exceeds a threshold
        if percent_changed > 10:
            # Convert the current frame to grayscale
            gray_frame = cv2.cvtColor(curr_frame, cv2.COLOR_BGR2GRAY)

            # Run OCR on the grayscale frame
            text = pytesseract.image_to_string(gray_frame)

            # Print the OCR output
            print(text)
            write_to_file(text)
            

        # Display the current frame
        cv2.imshow("Video", curr_frame)

        # Update the previous frame
        prev_frame = curr_frame

        # Exit if the 'q' key is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break


    gray_frame = cv2.cvtColor(prev_frame, cv2.COLOR_BGR2GRAY)
    text = pytesseract.image_to_string(gray_frame)
    print(text)
    write_to_file(text)

    # Release the video capture object and close all windows
    cap.release()
    cv2.destroyAllWindows()

# Import this function
def extract_text(video_path: str) -> None:
    """Extract text from video and save it to a file.

    Args:
        video_path (str): Path to video file.
    """
    audio_to_text(video_path)
    video_to_text(video_path)
    
    # Creating final text file
    with open("video_text.txt", "r") as f:
        video_text = f.read()
    with open("audio_text.txt", "r") as f:
        audio_text = f.read()
    with open("final_text.txt", "w") as f:
        f.write(video_text)
        f.write("\n")
        f.write(audio_text)

