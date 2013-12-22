stdout
======

When working with object streams, do you ever wish you could just pipe to `console.log`?

Now you can.

```
var request = require('request')
var JSONStream = require('JSONStream')
var stdout = require('stdout')

request('http://isaacs.couchone.com/registry/_all_docs')
  .pipe(JSONStream.parse('rows.*'))
  .pipe(stdout())
```


stdout([outputStream])
----------------------

`outputStream` is optional.  Defaults to `process.stdout`, but you can provide another stream like `process.stderr` if you want.

In the browser, it will automatically use `console.log`

Returns a writable stream that accepts Buffers, strings, or objects.

- When given a Buffer, it outputs it directly.  
- When given a string, it just outputs it with a newline, just like `console.log`.  
- When given an object, it uses `util.inspect` and a newline, just like `console.log`.  


License
-------
MIT
