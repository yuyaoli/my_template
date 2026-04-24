"""User service helpers for authentication flows."""

from datetime import UTC, datetime, timedelta

import jwt
from jwt import InvalidTokenError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from app.core.config import settings
from app.models.user import User


async def get_user_by_email(session: AsyncSession, email: str) -> User | None:
    """Return a user by email when present."""

    statement = select(User).where(User.email == email)
    result = await session.execute(statement)
    return result.scalar_one_or_none()


async def get_user_by_id(session: AsyncSession, user_id: int) -> User | None:
    """Return a user by primary key when present."""

    statement = select(User).where(User.id == user_id)
    result = await session.execute(statement)
    return result.scalar_one_or_none()


async def authenticate_user(
    session: AsyncSession,
    email: str,
    password: str,
) -> User | None:
    """Validate a user with email and password."""

    user = await get_user_by_email(session, email)
    if user is None or not user.verify_password(password):
        return None

    return user


async def ensure_default_user(session: AsyncSession) -> User | None:
    """Create or update the default user from environment variables."""

    if not settings.DEFAULT_USER_EMAIL or not settings.DEFAULT_USER_PASSWORD:
        return None

    user = await get_user_by_email(session, settings.DEFAULT_USER_EMAIL)
    hashed_password = User.hash_password(settings.DEFAULT_USER_PASSWORD)

    if user is None:
        user = User(
            email=settings.DEFAULT_USER_EMAIL,
            hashed_password=hashed_password,
        )
        session.add(user)
    else:
        user.hashed_password = hashed_password

    await session.commit()
    await session.refresh(user)
    return user


def create_access_token(user: User) -> str:
    """Create a signed access token for a user."""

    expire_at = datetime.now(UTC) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    payload = {
        "sub": str(user.id),
        "email": user.email,
        "exp": expire_at,
    }
    return jwt.encode(
        payload,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM,
    )


def decode_access_token(token: str) -> int | None:
    """Decode an access token and return the user id."""

    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM],
        )
    except InvalidTokenError:
        return None

    subject = payload.get("sub")
    if subject is None:
        return None

    try:
        return int(subject)
    except (TypeError, ValueError):
        return None
