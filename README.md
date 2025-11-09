🧠 Automated Verification System using Google Vision API
🚀 Overview

This project automates the extraction and verification of user information from scanned and handwritten documents using the Google Cloud Vision API.
It reduced processing time from 2 days to just 10 minutes, improving both speed and accuracy.

⚙️ Tech Stack

Python, Google Cloud Vision API

OpenCV, pdf2image, PyMuPDF (fitz)

pandas, openpyxl, eel (for UI)

🧩 Features

Extracts handwritten and printed text from scanned files.

Verifies extracted information against reference data automatically.

Highlights errors or missing fields in Excel reports.

Scalable and easy to integrate into existing data workflows.

⚡ Usage

Set up your Google Vision credentials:

export GOOGLE_APPLICATION_CREDENTIALS="config/credentials.json"


Run the application:

python main.py


Upload scanned documents and get verified results instantly.

📊 Results
Process	Before	After
Verification Time	~2 days	~10 minutes
Accuracy	~75%	95%+
🔒 Notes

Sensitive data and credentials are handled securely through environment variables.

No manual data entry or editing required.
