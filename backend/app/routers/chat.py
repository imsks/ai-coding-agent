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

        gen = model.generate_content(
            messages=history,
            stream=True,  # Gemini streaming
        )

        async def streamer():
            try:
                for chunk in gen:
                    if chunk.text:
                        delta = chunk.text
                        yield f"data:{delta}\n\n"  # SSE
                # save assistant msg at the end
                history.append({"role": "assistant", "content": gen.text})
            except Exception as e:
                yield f"data:Error: {str(e)}\n\n"

        return StreamingResponse(streamer(), media_type="text/event-stream")
    except Exception as e:
        return {"error": f"Failed to process chat request: {str(e)}"}