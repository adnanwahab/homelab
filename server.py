# from fastapi import FastAPI
# import uvicorn

# app = FastAPI()

# @app.get("/")
# def hello_world():
#     return {"message": "Hello from FastAPI!"}

# def main():
#     """Run the FastAPI app using uvicorn."""
#     uvicorn.run(
#         app,
#         host="0.0.0.0",
#         port=8080,
#         log_level="info"
#     )


# if __name__ == "__main__":
#     main()


#! uv pip install polars
import polars as pl


csv_path = "/home/adnan/derp/map_data/311_nyc.csv"


# Directly read only the first 100 rows
df = pl.read_csv(csv_path,
                    null_values="NA",
                    ignore_errors=True
)
#df.head()  # show first rows in a notebook