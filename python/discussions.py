# discussions.py
import os
from API import BraveAPI
from utils.main import dump_schema

# Create an instance of the BraveAPI class
brave = BraveAPI({
    'subscription_token': os.environ['BRAVE_KEY']
})

# Setting up parameters
params = {
    'q': "javascript vs python",
    'result_filter': "discussions",
}

# Performing the search
results = brave.search(params)

# Dumping and printing the schema of the results
print(dump_schema(results['discussions']))
