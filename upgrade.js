const fetch = require('node-fetch')
const md5 = require('md5')
const fs = require('fs')

fetch('https://apis.google.com/js/api.js')
  .then(response => response.text())
  .then(content => content + "\n\nmodule.exports = gapi;")
  .then(distant => {
    var local = fs.readFileSync('index.js')
    var checksum = md5(distant)

    if (checksum !== md5(local)) {
      fs.writeFileSync('index.js', distant)
      console.log('Writing new version :', checksum)
    } else {
      console.log('Current version is up to date !')
    }
  })
  .catch(error => console.log('Error during download :', error.message))
