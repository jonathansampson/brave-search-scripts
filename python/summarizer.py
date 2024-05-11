# summarizer.py
import os
from API import BraveAPI
from utils.main import dump_schema

# Create an instance of the BraveAPI class
brave = BraveAPI({
    'subscription_token': os.environ['BRAVE_KEY']
})

# Setting up parameters
params = {
    'q': "Third tallest mountain in the World",
}

# Performing the summarizer search
results = brave.summarizer(params)

# Dumping and printing the schema of the results
print(dump_schema(results))
