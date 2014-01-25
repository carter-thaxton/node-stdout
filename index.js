var through = require('through2')
var util = require('util')

function stdout(outputStream, prefix) {
  if (typeof outputStream === 'string') {
    prefix = outputStream
    outputStream = undefined
  }
  var output = outputStream
  if (!output) {
    if (process.browser) output = consoleLogStream()
    else output = process.stdout
  }
  if (!prefix) prefix = ''
  var ws = through({objectMode: true}, write)
  function write(data, enc, next) {
    var str;
    if (Buffer.isBuffer(data)) {
      this.push(Buffer.concat([new Buffer(prefix), data]))
    } else if (typeof data === 'string') {
      this.push(prefix + data + '\n')
    } else {
      this.push(prefix + util.inspect(data) + '\n')
    }
    next()
  }
  ws.pipe(output)
  return ws
}

function consoleLogStream() {
  return through(function(data, enc, next) {
    if (Buffer.isBuffer(data)) console.log(data.toString())
    else console.log(data)
    next()
  })
}

module.exports = stdout;
