var express = require('express')
var app = express()
var path = require('path')
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000
var serverIp = process.env.OPENSHIFT_NODEJS_IP || 'localhost'
let logDir = process.env.OPENSHIFT_LOG_DIR || __dirname + '/logs'

app.get('/', function(req, res) {
  res.sendFile(path.normalize(logDir + '/price-data.json'))
})

app.listen(port, serverIp, function() {
  console.log('Listening on port', port)
})