# import fitz  
# import re

# def extract_fields_from_pdf(pdf_path):
#     doc = fitz.open(pdf_path)
#     fields = {}

#     for page in doc:
#         text = page.get_text("text")
#         lines = text.split('\n')
#         for line in lines:
#             if ':' in line:
#                 key, value = line.split(':', 1)
#                 value = value.strip()
#                 if re.match(r"^\d+(\.\d+)?$", value.replace(',', '')):
#                     try:
#                         value = float(value.replace(',', ''))
#                     except:
#                         pass
#                 fields[key.strip()] = value

#     return fields


import fitz  

def extract_form_fields(pdf_path):
    doc = fitz.open(pdf_path)
    fields = {}

    for page in doc:
        text = page.get_text("dict")
        for block in text["blocks"]:
            if "lines" in block:
                for line in block["lines"]:
                    line_text = " ".join([span["text"] for span in line["spans"]])
                    if ":" in line_text:
                        key, value = line_text.split(":", 1)
                        fields[key.strip()] = value.strip()
    
    return fields

fields = extract_form_fields("data/Tax Form.pdf")
print(fields)
