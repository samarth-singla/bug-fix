from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.items import router as items_router
from routes.analytics import router as analytics_router
from routes.quiz import router as quiz_router
from routes.users import router as users_router                 # Imported missing module

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only, restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(items_router, prefix="/items")
app.include_router(analytics_router, prefix="/analytics")#added prefix
app.include_router(quiz_router, prefix="/quiz")#added prefix
app.include_router(users_router, prefix="/users")               # Included users router

# why the hell did I write this function?
@app.get("/")                                                   # "/home" to "/"
async def get_home():
    return {"message": "Welcome to the Multi-Page FastAPI App!"}