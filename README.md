# node-matelight

[matelight](https://github.com/jaseg/matelight) client for node.js using CRAP, the "Custom advanced video stReAming Protocol".

Install with:

    npm install matelight

Examples are in the matelight [playground](https://github.com/sodoku/matelight-playground)

If you don't have a matelight, you can also use the [emulator](https://github.com/sodoku/matelightemu).

## Usage

```js
var matelight = require('matelight');

var client = matelight.connect();

client.startLoop(function(){
  client.setLight(2, 2, 200, 0, 200);
});
```

# API

## matelight.connect(host, port)

Create a new matelight connection. The `host` and `port`default to `matelight.cbrp3.c-base.org:1337`.
This will be fine if you are at the c-base and your computer is connected to the crew network.

## client.clean()

Cleans the matelight screen by setting all lights to off.

## client.setLight(x, y, r, g, b)

Sets the light at positon x, y to color RGB(r, g, b)

CAUTION: the x and y values start at 1 as this seemed more intuitiv when pointing at the matelight.

Here is a sample that turns the most upper left light to red and the most lower right light to blue:

```js
  client.setLight(1, 1, 255, 0, 0);
  client.setLight(40, 16, 0, 0, 255);
```

## client.startLoop(cb, [interval])

Starts a loop which will clean the sceen, run the callback and then send all the lights which are set in the callback to the matelight screeen.
If no intervall is given, it will default to 300 ms which seems to be a compromise between high framerates and dropped packages. 

This example will send a red to the most upper left light every 100 ms:

```js
var client = matelight.connect();

client.startLoop(function(){
  client.setLight(1, 1, 255, 0, 0);
}, 100);
```

## client.stopLoop();

Stops the loop. Nothing will be send to the matelight anymore.

CAUTION: Even if the loop is stopped, some UDP packages might still arrive at the matelight.

# Extras

Some things that are exposed through the module. Only mess with this if you know what you are doing.

## client.ROWS

The ammount of rows of the matelight

## client.COLS

The ammount of columns of the matelight

## client.udpClient

The underlying udp client which is used to send the image buffers
