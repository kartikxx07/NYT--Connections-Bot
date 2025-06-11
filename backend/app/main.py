from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from .models.word_connection_model import WordConnectionModel

app = FastAPI(
    title="Word Connections Game API",
    description="API for the Word Connections Game with ML-powered word grouping",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the model
model = WordConnectionModel()

class WordGroupRequest(BaseModel):
    words: List[str]

@app.post("/api/get-answers")
async def get_answers(request: WordGroupRequest):
    """
    Get predicted word groups for a list of words
    """
    try:
        # Get predictions from the model
        predictions = model.predict(request.words)
        return {"groups": predictions}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 