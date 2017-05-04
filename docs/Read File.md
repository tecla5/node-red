# Read file

Use inject String message, pass as `payload`

```js
var fs= global.get("fs");
var fileName = msg.payload
try {
  node.log('fs')
  node.log(fs)
  var content = fs.readFileSync(fileName).toString();
  msg.payload = {
    message: content
  }
}
catch (ex) {
  msg.payload={
    error: ex,
    fileName
  }
}
return msg;
```

Then display file result via `Debug` node