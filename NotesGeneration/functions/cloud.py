import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv

# Load variables from .env file into environment
import os
load_dotenv()

# Configure Cloudinary with your credentials
cloudinary.config(
    cloud_name=os.getenv('cloud_name'),
    api_key=os.getenv('api_key'),
    api_secret=os.getenv('api_secret')
)

# Path to the PDF file you want to upload
pdf_path = './NotesGeneration/assets/rearranged.pdf'

# Upload the PDF
result = cloudinary.uploader.upload(pdf_path, resource_type='auto',overwrite=True)

# Print the result
print(result)

pdf_url = result['url']
print("Uploaded PDF URL:", pdf_url)