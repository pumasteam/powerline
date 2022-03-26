from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from powerline import sentiment

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sentiment.api)

if __name__ == "__main__":
    uvicorn.run(app, port=8000, host = "0.0.0.0")