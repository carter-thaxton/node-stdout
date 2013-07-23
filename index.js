var stream = require('stream')
var util = require('util')

function stdout(outputStream) {
  var output = outputStream || process.stdout
  var ws = stream.Writable({objectMode: true})
  ws._write = function(data, enc, next) {
    var str;
    if (Buffer.isBuffer(data)) {
      output.write(data)
    } else if (typeof data === 'string') {
      output.write(data + '\n')
    } else {
      output.write(util.inspect(data) + '\n')
    }
    next()
  }
  return ws
}

module.exports = stdout;
