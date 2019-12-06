const express = require('express')
const app = express()
const stringifyObject = require('stringify-object')
const https = require('https')
const fs = require('fs')
const port = 443
const crypto = require("crypto");

const writeObject = (res, object) => {
  strObject = stringifyObject(object, {
    indent: '  ',
    singleQuotes: false
  })
  console.debug(strObject)
  res.write('<pre>' + strObject + '</pre>')
}

app.get("/", (req, res) => {
  const id = crypto.randomBytes(16).toString("hex");
  console.debug('--- start ' + id + ' ---')

  res.setHeader('Content-Type', 'text/html')
  res.write('debug-https')
  writeObject(res, req.httpVersion)
  writeObject(res, req.method)
  writeObject(res, req.url)
  writeObject(res, req.rawHeaders)

  peerCertificate = req.socket.getPeerCertificate()
  if (Object.keys(peerCertificate).length > 0) {
    peerCertificate.raw = 'removed'
    peerCertificate.pubkey = 'removed'
    writeObject(res, peerCertificate)
  }

  res.end()
  console.debug('--- end ' + id + ' ---')
})

server = https.createServer({
  key: fs.readFileSync('./cert.key'),
  cert: fs.readFileSync('./cert.pem'),
  requestCert: true, // Request client certificate
  rejectUnauthorized: false // Ingore if no client certificate is present
}, app)

server.listen(port)