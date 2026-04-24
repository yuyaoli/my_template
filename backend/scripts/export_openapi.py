import json
from pathlib import Path

from app.main import app


target_path = Path(__file__).parent.parent.parent / "frontend" / "openapi.json"
with open(target_path, "w", encoding="utf-8") as f:
    json.dump(app.openapi(), f, ensure_ascii=False, indent=2)

print(f"Exported openapi.json to {target_path}")
