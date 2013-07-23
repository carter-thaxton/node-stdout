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

Returns a writable stream that accepts either objects or strings.
When given an object, it uses `util.inspect`, just like `console.log`.

- `outputStream` is optional.  Defaults to `process.stdout`, but you can provide another stream like `process.stderr` if you want.


License
-------
MIT
