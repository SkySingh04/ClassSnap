from transformers import PegasusForConditionalGeneration, PegasusTokenizer

tokenizer = PegasusTokenizer.from_pretrained("google/pegasus-xsum")
model = PegasusForConditionalGeneration.from_pretrained("google/pegasus-xsum")

def summarise(text_file: str):
    """Summarises the document

    Args:
        text_file (str): path of the text file
    """

    with open(text_file, "r") as f:
        text = f.read()

    # Split the input text into chunks of 512 tokens
    chunk_size = 512
    chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]

    # Generate a summary for each chunk
    summaries = []
    for chunk in chunks:
        input_ids = tokenizer.encode(chunk, return_tensors='pt')
        summary_ids = model.generate(input_ids, max_length=50)
        summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
        summaries.append(summary)

    # Join the summaries back into a single string
    summary_text = "\n".join(summaries)
    
    with open(r"NotesGeneration\Output\summarized.txt", "w") as f:
        f.write(summary_text)
