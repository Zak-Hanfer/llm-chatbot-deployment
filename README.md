# LLM Chatbot Deployment

A production-ready full-stack AI chatbot with GPU acceleration.

## 🎯 Features

- **AI Model**: Microsoft Phi-3-mini (3.8B parameters)
- **Backend**: FastAPI REST API
- **Frontend**: React + Vite
- **Deployment**: Docker + GPU support
- **Hardware**: Optimized for 6GB VRAM GPUs

## 🚀 Quick Start

### Prerequisites
- Docker Desktop with WSL2
- NVIDIA GPU + drivers
- NVIDIA Container Toolkit

### Run

```bash
git clone <your-repo-url>
cd llm-chatbot-deployment
docker-compose up
```

Open http://localhost:5173

## 📋 Architecture
Browser (React)
↓
FastAPI (8000)
↓
Phi-3-mini (GPU)

## 🛠 Technologies

- Python 3.12, FastAPI, HuggingFace Transformers
- React 18, Vite, JavaScript
- Docker, Docker Compose
- NVIDIA CUDA, WSL2
- PyTorch

## 📁 Project Structure
```
.
├── Backend/
│   ├── app.py          # FastAPI server
│   ├── model.py        # Model loading
│   ├── requirements.txt
│   └── Dockerfile
├── my-app/             # React frontend
│   ├── src/
│   │   └── App.jsx
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```
## 🔧 Configuration

Set your HuggingFace token in `docker-compose.yml`:

```yaml
environment:
  - HF_TOKEN=your_token_here
```

## 📝 License

MIT License - see LICENSE file

## 👤 Author

Zaki Hanfer - Internship Project
