# news.py
import os
from API import BraveAPI
from utils.main import dump_schema

# Create an instance of the BraveAPI class
brave = BraveAPI({
    'subscription_token': os.environ['BRAVE_KEY']
})

# Setting up parameters
params = {
    'q': "Shack15 llama3 hackathon",
    'text_decorations': False,
    'freshness': "pw"
}

# Performing the news search
results = brave.news(params)

# Dumping and printing the schema of the results
print(dump_schema(results))
