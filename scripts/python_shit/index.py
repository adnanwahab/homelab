from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import redis
from supabase import create_client, Client
from typing import Optional
import os
from dotenv import load_dotenv
import uvicorn

# Load environment variables
load_dotenv()

app = FastAPI(title="FastAPI with Redis and Supabase")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Redis connection
redis_client = redis.Redis(
    host=os.getenv("UPSTASH_REDIS_HOST"),
    port=int(os.getenv("UPSTASH_REDIS_PORT", "6379")),
    password=os.getenv("UPSTASH_REDIS_PASSWORD"),
    ssl=True
)

# Initialize Supabase client
supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

# Pydantic models
class User(BaseModel):
    id: Optional[int] = None
    name: str
    email: str

# Cache decorator
def cache(expiration_seconds: int = 300):
    def decorator(func):
        async def wrapper(*args, **kwargs):
            # Create a cache key from function name and arguments
            cache_key = f"{func.__name__}:{str(args)}:{str(kwargs)}"
            
            # Try to get cached result
            cached_result = redis_client.get(cache_key)
            if cached_result:
                return eval(cached_result)
            
            # If not cached, execute function
            result = await func(*args, **kwargs)
            
            # Cache the result
            redis_client.setex(
                cache_key,
                expiration_seconds,
                str(result)
            )
            
            return result
        return wrapper
    return decorator

# API endpoints
@app.post("/users/")
async def create_user(user: User):
    try:
        data, error = supabase.table("users").insert({
            "name": user.name,
            "email": user.email
        }).execute()
        
        if error:
            raise HTTPException(status_code=400, detail=str(error))
            
        return {"message": "User created successfully", "data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/users/{user_id}")
@cache(expiration_seconds=300)
async def get_user(user_id: int):
    try:
        # Try to get from Supabase
        data, error = supabase.table("users").select("*").eq("id", user_id).execute()
        
        if error:
            raise HTTPException(status_code=400, detail=str(error))
            
        if not data:
            raise HTTPException(status_code=404, detail="User not found")
            
        return data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/users/")
@cache(expiration_seconds=300)
async def list_users():
    try:
        data, error = supabase.table("users").select("*").execute()
        
        if error:
            raise HTTPException(status_code=400, detail=str(error))
            
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=3003, reload=True)





def redis_and_supabase():
    from upstash_redis import Redis

    redis = Redis(url="https://literate-cow-48785.upstash.io", token="********")

    redis.set("foo", "bar")
    value = redis.get("foo")