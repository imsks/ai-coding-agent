from pydantic import BaseModel, Field

class ChatRequest(BaseModel):
    session_id: str = Field(..., description="Unique session identifier for chat history")
    message: str = Field(..., description="User message to send to AI")
