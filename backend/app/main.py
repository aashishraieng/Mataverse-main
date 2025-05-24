from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import contact_routes
from app.routes import join_routes
from app.routes import registration_routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact_routes.router, prefix="/api/v1")
app.include_router(join_routes.router, prefix="/api/v1")
app.include_router(registration_routes.router, prefix="/api/v1")
@app.on_event("startup")
async def startup_event():
    print("🚀 FastAPI server started and ready!")

@app.get("/")
async def root():
    return {"message": "Welcome to Metaverse API"}
