"""Response schemas for hello endpoints."""

from pydantic import BaseModel


class HelloResponse(BaseModel):
    """Return the hello endpoint payload."""

    message: str
