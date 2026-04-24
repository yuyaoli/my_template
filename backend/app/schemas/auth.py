"""Schemas for authentication requests and responses."""

from pydantic import BaseModel


class TokenCreateRequest(BaseModel):
    """Request body for creating an access token."""

    email: str
    password: str


class TokenResponse(BaseModel):
    """Response body for an access token."""

    access_token: str
    token_type: str = "bearer"
