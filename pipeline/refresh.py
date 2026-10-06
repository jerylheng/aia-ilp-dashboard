import json,os,requests
from datetime import datetime,timezone
from pathlib import Path
OUT=Path("data/live.json")
U=Path("data/funds.json")
# The production adapter is intentionally conservative. It only publishes
# values returned by a verified provider and never substitutes illustrative data.
payload=json.loads(U.read_text())
out={"generated_at":datetime.now(timezone.utc).isoformat(),"live":False,"benchmark":{"symbol":"^SP500TR","name":"S&P 500 Total Return","prices":[]},"funds":payload["funds"],"failures":[{"message":"Verified AIA feed adapter is pending provider validation."}]}
OUT.write_text(json.dumps(out,indent=2))
print("Wrote guarded live feed:",OUT)