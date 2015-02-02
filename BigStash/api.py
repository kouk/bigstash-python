import json
import requests

from httpsig.requests_auth import HTTPSignatureAuth


headers = {
    'User-agent': 'BigStash Python SDK v{}'.format(version),
    'Accept': 'application/vnd.deepfreeze+json',
    'Content-Type': 'application/vnd.deepfreeze+json'
}


class API(object):

    def __init__(self, key=None, secret=None, base_url=None):
        self.key = key
        self.secret = secret
        self.base_url = base_url

    def _AuthRequest(self):
        if self.key and self.secret:
            signature_headers = ['(request-line)', 'date', 'host']
            host = urlparse(URL).netloc
            headers.update({
                'Host': host,
                'X-Deepfreeze-Api-Key': self.key,
                'Date': time.strftime('%a, %d %b %Y %H:%M:%S GMT',
                                      time.gmtime(time.time()))
            })

            return HTTPSignatureAuth(key_id=self.key, secret=self.secret,
                                     algorithm='hmac-sha256',
                                     headers=signature_headers)

    def GetArchiveList(self):
        url = self.base_url + 'archives/'
        auth = self._AuthRequest()
        try:
            req = requests.get(url, auth=auth, headers=headers)
            return json.loads(req.content)
        except requests.RequestsException as e:
            pass
            
    def GetUser(User):
        url = self.base_url + 'user/'

    def GetArchive(self, archive_id):
        url = self.base_url + 'archives/' + archive_id + '/'

    def GetUpload(self, upload_id):
        url = self.base_url + 'uploads/' + upload_id + '/'

    def CreateArchive(self, title=None, size=None, user_id=None):
        url = self.base_url + 'archives/'

    def CreateUpload(self):
        url = self.base_url + 'uploads/'

    def UpdateUpload(self, upload_id):
        url = self.base_url + 'uploads/' + upload_id + '/'

    def DestroyUpload(self, upload_id):
        url = self.base_url + 'uploads/' + upload_id + '/'
