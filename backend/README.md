## dev mode
cd backend
make dev

## deploy
docker compose up --build

## export openapi.json
cd backend
uv run python -m scripts.export_openapi
