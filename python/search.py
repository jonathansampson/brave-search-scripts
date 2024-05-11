# search.py
import os
from API import BraveAPI
from utils.main import dump_schema

# Create an instance of the BraveAPI class
brave = BraveAPI({
    'subscription_token': os.environ['BRAVE_KEY']
})

# Goggles ID URL
goggle_id = "https://raw.githubusercontent.com/brave/" \
            "goggles-quickstart/main/goggles/tech_blogs.goggle"

# Setting up parameters
params = {
    'q': "Shack15 llama3 hackathon",
    'text_decorations': False,
    'freshness': "pw",
    'result_filter': "web",
    'goggles_id': goggle_id
}

# Performing the search
results = brave.search(params)

# Dumping and printing the schema of the results
print(dump_schema(results))
