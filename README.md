# node-matelight

[matelight](https://github.com/jaseg/matelight) module for node.js

```js
var matelight = require('matelight');

var m = matelight.connect();

m.startLoop(function(){
  m.setLight(2, 2, 200, 0, 200);
});
```
