# 🧠 NYT Connections Bot
![Python](https://img.shields.io/badge/python-3.12-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100.0-lightgrey?logo=fastapi)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.3-teal?logo=tailwind-css)
![NumPy](https://img.shields.io/badge/NumPy-2.3.0-orange?logo=numpy)
![Pandas](https://img.shields.io/badge/Pandas-2.3.0-blue?logo=pandas)
![PyTorch](https://img.shields.io/badge/PyTorch-2.7.1-red?logo=pytorch)
![Transformers](https://img.shields.io/badge/Transformers-4.52.4-blue)
![License](https://img.shields.io/badge/license-MIT-green)

A web application that generates word connections using the New York Times datasets. The project leverages NLP techniques to find semantic relationships between words and presents them via an interactive frontend with a FastAPI backend.

## 🗂 Project Structure

news-sentiment-pipeline/
├── backend/
│   ├── app/
│   │   └── __pycache__/
│   ├── api/
│   │   ├── __pycache__/
│   │   └── routes.py
│   ├── models/
│   │   ├── __pycache__/
│   │   └── word_connection_model.py
│   ├── services/
│   │   ├── __pycache__/
│   │   └── data_processor.py
│   ├── main.py
│   └── requirements.txt
├── docs/
│   └── instructions-gif-connections.gif
├── public/
│   └── favicon.png
├── src/
├── .gitignore
├── .postcssrc
├── LICENSE
├── README.md
├── components.json
├── jsconfig.json
├── package-lock.json
├── package.json
└── tailwind.config.js


## 🚀 Getting Started

### Install Backend Dependencies

cd backend  
pip install -r requirements.txt

### Install Frontend Dependencies

npm install

### Run the Backend

cd backend  
python main.py

### Run the Frontend

npm run dev

## 🎯 Features

-   Generate connections between words using NYT datasets.
    
-   Interactive web interface.
    
-   Lightweight FastAPI backend for API requests.
    
-   Modular services and models for easy expansion.
    
-   Designed for fast response and scalability.
    

## 📊 Basic Metrics (Example)

Metric

Value

Avg. Response Time

120 ms

Accuracy of Connections (sample)

87%

API Uptime

99%

Note: Metrics are indicative and may vary based on dataset size and server load.

## 🛠 Future Roadmap

-   Add real-time word suggestions and auto-complete.
    
-   Expand dataset coverage with multiple sources.
    
-   Integrate more advanced NLP models for semantic similarity.
    
-   Add authentication and user profiles.
    
-   Include a leaderboard for fun word-connection competitions.
    
-   Explore multilingual support and semantic clustering.
    

## 🤝 Contribution

Contributions are welcome! Fork the repository, create a feature branch, and submit a pull request with improvements.

**Author:** Kartikay Luthra  
**Contact:** LinkedIn | Email

## ⚡ Tech Stack

-   Backend: Python, FastAPI
    
-   Frontend: Tailwind CSS, JavaScript
    
-   Models: NLP-based word connection models
    
-   Tools: Modular Python services, API client
