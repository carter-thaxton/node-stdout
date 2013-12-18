var through = require('through2')
var util = require('util')

function stdout(outputStream) {
  var output = outputStream
  if (!output) {
    if (process.browser) output = consoleLogStream()
    else output = process.stdout
  }
  var ws = through({objectMode: true}, write)
  function write(data, enc, next) {
    var str;
    if (Buffer.isBuffer(data)) {
      this.push(data)
    } else if (typeof data === 'string') {
      this.push(data + '\n')
    } else {
      this.push(util.inspect(data) + '\n')
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
