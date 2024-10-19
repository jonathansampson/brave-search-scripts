# videos.py
import os
from API import BraveAPI
from utils.main import dump_schema

# Create an instance of the BraveAPI class
brave = BraveAPI({
    'subscription_token': os.environ['BRAVE_KEY']
})

# Setting up parameters
params = {
    'q': "function calling with groq",
    'freshness': "py"
}

# Performing the videos search
results = brave.videos(params)

# Dumping and printing the schema of the results
print(dump_schema(results))
