from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from ..schemas import ChatRequest
from ..deps import model, get_memory

router = APIRouter()

@router.post("/chat")
async def chat(req: ChatRequest):
    try:
        history = get_memory(req.session_id)
        history.append({"role": "user", "content": req.message})

        contents = []
        for msg in history:
            if msg["role"] == "user":
                contents.append({"role": "user", "parts": [{"text": msg["content"]}]})
            elif msg["role"] == "assistant":
                contents.append({"role": "model", "parts": [{"text": msg["content"]}]})
        
        if not contents:
            contents = [{"role": "user", "parts": [{"text": req.message}]}]

        gen = model.generate_content(
            contents=contents,
            stream=True,
        )

        async def streamer():
            try:
                full_response = ""
                for chunk in gen:
                    if chunk.text:
                        delta = chunk.text
                        full_response += delta
                        yield f"data:{delta}\n\n"
                
                history.append({"role": "assistant", "content": full_response})
            except Exception as e:
                yield f"data:Error: {str(e)}\n\n"

        return StreamingResponse(streamer(), media_type="text/event-stream")
    except Exception as e:
        return {"error": f"Failed to process chat request: {str(e)}"}