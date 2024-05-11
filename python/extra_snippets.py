# extra_snippets.py
import os
import json
from API import BraveAPI

# Create an instance of the BraveAPI class
brave = BraveAPI({
    'subscription_token': os.environ['BRAVE_KEY']
})

# Setting up parameters
params = {
    'q': "llama3 hackathon May 2024",
    'text_decorations': False,
    'freshness': "pm",
    'result_filter': "web"
}

# Performing the search
results = brave.search(params)

# Extract the first 3 results and their snippets
first3 = results['web']['results'][:3]
snippets = [
    {
        'title': result['title'],
        'url': result['url'],
        'snippets': result.get('extra_snippets', [])
    }
    for result in first3
]

# Print the extracted snippets in formatted JSON
print(json.dumps(snippets, indent=4))
