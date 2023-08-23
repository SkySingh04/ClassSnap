from fpdf import FPDF
from datetime import datetime

def create_pdf(file_path: str):
    """Creates a PDF file from the text file
    
    Args:
        file_path (str): path of the text file
    """


    # Open the text file
    with open(file_path, "r") as file:
        text = file.read()

    # Create a new PDF object
    pdf = FPDF()

    # Add a page
    pdf.add_page()

    # Set the font and size
    pdf.set_font("helvetica", size=12)

    # Write the text from the file
    pdf.multi_cell(0, 10, text)

    pdf_file = datetime.now().strftime("%m-%d.pdf")
    # Save the PDF
    pdf.output(pdf_file)
    