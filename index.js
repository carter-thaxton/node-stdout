var stream = require('stream')
var util = require('util')

function stdout(outputStream) {
  var output = outputStream || process.stdout
  var ws = stream.Writable({objectMode: true})
  ws._write = function(data, enc, next) {
    output.write(util.inspect(data) + '\n')
    next()
  }
  return ws
}

module.exports = stdout;
