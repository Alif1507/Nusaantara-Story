uvicorn app.main:app --host 0.0.0.0 --port 8081 --reload
# POST /recommend
# { "query": "danau toba", "top_k": 5, "filters": { "region": "sumatera" } }
