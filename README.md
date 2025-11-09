# Automated Verification System using Google Vision API

## Overview
This project automates the extraction and verification of user information from scanned and handwritten documents using the Google Cloud Vision API.  
It reduced the manual verification process from 2 days to only 10 minutes, improving both accuracy and efficiency.

---

## Tech Stack
- Python
- Google Cloud Vision API
- pandas, openpyxl
- OpenCV, pdf2image, PyMuPDF (fitz)
- eel (for user interface)

---

## Features
- Extracts handwritten and printed text from scanned documents
- Automatically verifies extracted fields (name, ID, etc.)
- Highlights inconsistencies or missing data in Excel reports
- Scalable and easy to integrate into existing workflows

---

## Quick Start

### 1. Clone the repository
git clone https://github.com/yourusername/automated-verification.git
cd automated-verification

## 2. Install dependencies
pip install -r requirements.txt


## Results

| Process           | Before  | After       |
|-------------------|---------|-------------|
| Data Verification | ~2 days | 10 minutes  |
| Accuracy          | ~75%    | 95%+        |

---

## Security
- Credentials and API keys are managed via **environment variables**.
- No sensitive data is stored or logged.
- Temporary files (if any) are created with restricted permissions.

---

## Future Improvements
- Support multilingual OCR.
- Integrate with BigQuery or Firestore.
- Add AI-based post-processing for OCR text correction.

---

## Impact
This system transformed a slow, manual verification process into a **fast, reliable, and automated pipeline**, saving time and improving consistency.
