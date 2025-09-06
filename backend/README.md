##dev mode
cd backend
uv run python -m app.main

##deploy
docker compose up --build

##export openapi.json
uv run python -m app.main
cd backend
uv run python -m scripts.export_openapi