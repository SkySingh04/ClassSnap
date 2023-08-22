import cloudinary
import cloudinary.uploader

# Configure Cloudinary with your credentials
cloudinary.config(
    cloud_name='dptrkbl3o',
    api_key='613799345313771',
    api_secret='_u5ycqFktrQ7gK61fdfHjJDWjWU'
)

# Path to the PDF file you want to upload
pdf_path = './NotesGeneration/assets/rearranged.pdf'

# Upload the PDF
result = cloudinary.uploader.upload(pdf_path, resource_type='auto',overwrite=True)

# Print the result
print(result)

pdf_url = result['url']
print("Uploaded PDF URL:", pdf_url)