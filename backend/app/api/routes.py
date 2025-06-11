from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from ..models.word_connection_model import WordConnectionModel

router = APIRouter()
model = WordConnectionModel()

class WordGroupRequest(BaseModel):
    words: List[str]

@router.post("/get-answers")
async def get_answers(request: WordGroupRequest):
    try:
        return {"groups": model.predict(request.words)}
    except Exception as e:
        print(f"Error in get_answers: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e)) 