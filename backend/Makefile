.PHONY: dev dev-up dev-down dev-logs dev-ps gen-client

DEV_COMPOSE_FILE = docker-compose.dev.yml

dev:
	uv run python -m app.main

dev-up:
	docker compose -f $(DEV_COMPOSE_FILE) up -d

dev-down:
	docker compose -f $(DEV_COMPOSE_FILE) down

dev-logs:
	docker compose -f $(DEV_COMPOSE_FILE) logs -f

dev-ps:
	docker compose -f $(DEV_COMPOSE_FILE) ps

gen-client:
	uv run python -m scripts.export_openapi
	cd ../frontend && bun run gen-client
