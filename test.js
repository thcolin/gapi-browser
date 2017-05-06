const expect = require('chai').expect
const fetch = require('node-fetch')
const md5 = require('md5')
const fs = require('fs')
const gapi = require('./index.js')

describe('gapi', function(){
  this.timeout(10000)

  // impossible : travis-ci get different checksum as local : 272a52e59d1f98a4bf2409e77a029b62 - d3b6759a32936b3951340c194d448a70 (05/06/17)
  xit('should have same md5 checksum as [distant](https://apis.google.com/js/api.js)', function(){
    var local = fs.readFileSync('index.js')

    // repeat n times because api.js can give different script versions (and so diffrent md5)
    return Promise.all(Array.from(Array(10).keys())
        .map(i => new Promise(resolve => setTimeout(resolve, i * 500))
          .then(() => fetch('https://apis.google.com/js/api.js'))
        )
      )
      .then(responses => Promise.all(responses.map(response => response.text())))
      .then(contents => contents.map(content => content + "\n\nmodule.exports = gapi;"))
      .then(distants => distants.map(distant => md5(distant)))
      .then(checksums => expect(md5(local), JSON.stringify(checksums)).to.be.oneOf(checksums))
  })

  it('should have a load property', function(){
    expect(gapi).to.have.property('load')
  })

  it('should be able to load client', function(done){
    gapi.load('client', done)
  })
})
