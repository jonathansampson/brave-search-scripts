# images.py
import os
from API import BraveAPI
from utils.main import dump_schema

# Create an instance of the BraveAPI class
brave = BraveAPI({
    'subscription_token': os.environ['BRAVE_KEY']
})

# Setting up parameters
params = {
    'q': "San Francisco Golden Gate Bridge",
    'safesearch': "strict",
    'count': 10
}

# Performing the images search
results = brave.images(params)

# Dumping and printing the schema of the results
print(dump_schema(results))
