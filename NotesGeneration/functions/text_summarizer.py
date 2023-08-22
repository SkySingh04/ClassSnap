from transformers import BertTokenizer, BertForSeq2SeqLM
import torch

def summarize_with_bert(input_text, max_output_length=1000):
    tokenizer = BertTokenizer.from_pretrained("facebook/bart-large-cnn")
    model = BertForSeq2SeqLM.from_pretrained("facebook/bart-large-cnn")

    inputs = tokenizer(input_text, return_tensors="pt", max_length=1024, truncation=True)
    summary_ids = model.generate(inputs["input_ids"], max_length=max_output_length, num_beams=4, early_stopping=True)

    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary

# Example usage
input_notes = """
Your input notes here. These can be a large number of lines that you want to summarize using BERT.
BERT is a powerful transformer-based model that can generate abstractive summaries of text.
"""

summary = summarize_with_bert(input_notes, max_output_length=100)
print(summary)
