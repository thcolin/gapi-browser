# gapi-client

A *very* thin Node wrapper for Google's client-side javascript V3 API. For `gapi` documentation, see [Google API Client Reference](https://developers.google.com/api-client-library/javascript/reference/referencedocs) and for `API_KEY`, see [Google Developers Console](https://console.developers.google.com/).

## Install

```bash
npm install --save gapi-client
```

## Example

```javascript
import gapi from 'gapi-client'

// Example : Auth2 (synchronous)
const init = () => gapi.client.init(
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
  clientId: 'YOUR_CLIENT_ID',
  scope: 'https://www.googleapis.com/auth/drive.metadata.readonly'
})

gapi.load('client:auth2', init)

// Example : Youtube (synchronous)
const init = {
  client: () => gapi.client.load('youtube', 'v3', init.youtube),
  youtube: () => gapi.client.setApiKey('YOUR_API_KEY')
}

gapi.load('client', init.client)

// Example : Youtube (promisified)
new Promise(resolve => gapi.load('client', resolve))
  .then(() => new Promise(resolve => gapi.client.load('youtube', 'v3', resolve)))
  .then(() => gapi.client.setApiKey('YOUR_API_KEY'))
```

## License

MIT license.
