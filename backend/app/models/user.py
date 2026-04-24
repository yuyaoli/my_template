"""Database user model for authentication and ownership."""

import bcrypt
from sqlmodel import Field

from app.models.base import BaseModel


class User(BaseModel, table=True):
    """User model for storing user accounts."""

    id: int | None = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str
    username: str | None = Field(default=None)

    def verify_password(self, password: str) -> bool:
        """Verify whether the plain password matches the stored hash."""

        return bcrypt.checkpw(
            password.encode("utf-8"), self.hashed_password.encode("utf-8")
        )

    @staticmethod
    def hash_password(password: str) -> str:
        """Hash a password with bcrypt."""

        salt = bcrypt.gensalt()
        return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")
