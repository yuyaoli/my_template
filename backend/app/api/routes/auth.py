"""Authentication and current-user endpoints."""

from fastapi import APIRouter, HTTPException, status

from app.api.deps import CurrentUser, SessionDep
from app.schemas import TokenCreateRequest, TokenResponse, UserResponse
from app.services.user import authenticate_user, create_access_token


router = APIRouter()


@router.post("/tokens", response_model=TokenResponse)
async def create_token(
    payload: TokenCreateRequest, session: SessionDep
) -> TokenResponse:
    """Create an access token for a valid user."""

    user = await authenticate_user(session, payload.email, payload.password)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password.",
        )

    return TokenResponse(access_token=create_access_token(user))


@router.get("/me", response_model=UserResponse)
async def read_me(current_user: CurrentUser) -> UserResponse:
    """Return the currently authenticated user."""

    return UserResponse.model_validate(current_user)
