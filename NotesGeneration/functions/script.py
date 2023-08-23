from text_extractor import extract_text
from text_summarizer import summarise
from generate_pdf import create_pdf

extract_text(r"NotesGeneration\assets\python_100_sec.mp4")
summarise("NotesGeneration/Output/audio_text.txt")
create_pdf("NotesGeneration/Output/summarized.txt")