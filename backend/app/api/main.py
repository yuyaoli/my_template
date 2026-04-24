from fastapi import APIRouter
from app.api.routes import auth, hello


api_router = APIRouter()


api_router.include_router(auth.router, tags=["auth"])
api_router.include_router(hello.router, prefix="/hello", tags=["hello"])
