🧠 Automated Verification System using Google Vision API

Automated solution to extract and verify user information from scanned and handwritten documents using the Google Cloud Vision API.
This project reduced the manual verification process from 2 days to only 10 minutes, boosting both accuracy and efficiency.

⚙️ Tech Stack

🐍 Python

☁️ Google Cloud Vision API

🧾 pandas, openpyxl

🖼️ OpenCV, pdf2image, PyMuPDF (fitz)

🌐 eel (for the interactive interface)

✨ Features

📄 Extracts text (handwritten or printed) from scanned documents

✅ Automatically verifies extracted fields (name, ID, etc.)

⚡ Highlights inconsistencies or missing data in Excel reports

🔁 Scalable and easily integrable into larger workflows

🚀 Quick Start

Clone the repository

git clone https://github.com/yourusername/automated-verification.git
cd automated-verification


Install dependencies

pip install -r requirements.txt


Set Google Vision credentials

export GOOGLE_APPLICATION_CREDENTIALS="config/credentials.json"


Run the app

python main.py

📊 Results
Process	Before	After
Data Verification	~2 days	~10 minutes
Accuracy	~75%	95%+
🔒 Security

Credentials and API keys are managed through environment variables.

No sensitive data is stored or logged.

💡 Future Improvements

Support for multilingual document OCR

Integration with BigQuery or Firestore

AI-powered post-processing for OCR accuracy

🏆 Impact

A fully automated, cloud-powered system that transformed a slow manual review process into a fast, reliable, and intelligent verification pipeline.
