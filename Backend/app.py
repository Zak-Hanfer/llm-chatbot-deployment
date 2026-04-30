from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from model import generate_response

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Request(BaseModel):
    prompt: str

@app.post("/generate")
def generate(req: Request):
    response = generate_response(req.prompt)
    return {"response": response}
@app.get("/")
def root():
    return {"message": "API is running"}


