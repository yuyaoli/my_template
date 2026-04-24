"""Schemas for user responses."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict


class UserResponse(BaseModel):
    """Public representation of a user."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    email: str
    username: str | None
    created_at: datetime
