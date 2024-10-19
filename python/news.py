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
    'q': "San Francisco Hackathon Shack15",
    'text_decorations': False,
    'freshness': "py"
}

# Performing the news search
results = brave.news(params)

# Dumping and printing the schema of the results
print(dump_schema(results))
