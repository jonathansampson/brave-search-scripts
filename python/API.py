import time
import urllib.request
import urllib.parse
import json
import gzip
from io import BytesIO

class BraveAPI:
    version = "v1"
    poll_sleep_time = 0.05  # 50 milliseconds
    base = "https://api.search.brave.com/res"

    def __init__(self, options):
        if 'subscription_token' not in options:
            raise ValueError("Missing subscription token")
        self.headers = {
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate, br",
            "X-Subscription-Token": options['subscription_token']
        }

    def _get_response(self, request):
        with urllib.request.urlopen(request) as response:
            if response.info().get('Content-Encoding') == 'gzip':
                buf = BytesIO(response.read())
                with gzip.GzipFile(fileobj=buf) as gzip_file:
                    return json.loads(gzip_file.read().decode('utf-8'))
            else:
                return json.loads(response.read().decode('utf-8'))

    def search(self, params):
        path = "/web/search"
        query_string = urllib.parse.urlencode(params)
        endpoint = f"{self.base}/{self.version}{path}?{query_string}"
        request = urllib.request.Request(endpoint, headers=self.headers)
        return self._get_response(request)

    def summarizer(self, params):
        params['summary'] = True
        search = self.search(params)

        if 'summarizer' not in search:
            raise ValueError("No summarizer key found")

        path = "/summarizer/search"
        query = urllib.parse.urlencode({'key': search['summarizer']['key'], 'entity_info': 1})
        endpoint = f"{self.base}/{self.version}{path}?{query}"
        
        request = urllib.request.Request(endpoint, headers=self.headers)
        results = self._get_response(request)
        while not results:
            time.sleep(self.poll_sleep_time)
            results = self._get_response(request)
        return results

    def news(self, params):
        path = "/news/search"
        query_string = urllib.parse.urlencode(params)
        endpoint = f"{self.base}/{self.version}{path}?{query_string}"
        request = urllib.request.Request(endpoint, headers=self.headers)
        return self._get_response(request)

    def images(self, params):
        path = "/images/search"
        query_string = urllib.parse.urlencode(params)
        endpoint = f"{self.base}/{self.version}{path}?{query_string}"
        request = urllib.request.Request(endpoint, headers=self.headers)
        return self._get_response(request)

    def videos(self, params):
        path = "/videos/search"
        query_string = urllib.parse.urlencode(params)
        endpoint = f"{self.base}/{self.version}{path}?{query_string}"
        request = urllib.request.Request(endpoint, headers=self.headers)
        return self._get_response(request)
