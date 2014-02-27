var PORT = 1337;
var HOST = 'matelight.cbrp3.c-base.org';
var ROWS = 16;
var COLS = 40;

var dgram = require('dgram');


exports.connect = function(host, port){

  var message = new Buffer(1924);
  var pic = message.slice(0);

  var loop;

  var self = {};

  self.ROWS = ROWS;
  self.COLS = COLS;
  self.HOST = host || HOST;
  self.PORT = PORT || PORT;

  self.udpClient = dgram.createSocket('udp4');

  self.clean = function(){
    for (var i = 0 ; i < pic.length; i ++){
      pic[i] = 0;
    }
  };

  self.setLight = function(x, y, r, g, b){
    x = (x - 1) % COLS;
    y = (y - 1) % ROWS ;
    var pos = 3 * (x + (COLS * y));
    pic[pos] = r;
    pic[pos+1] = g;
    pic[pos+2] = b;
    return;
  };

  self.startLoop = function(cb, interval) {
    interval = interval || 300;
    loop = setInterval(function(){
      self.clean();
      if (cb) cb();
      self.udpClient.send(message, 0, message.length, self.PORT, self.HOST, function(err, bytes) {
          if (err) throw err;
      });
    }, interval);
  };

  self.stopLoop = function(){
    if (loop) loop.cancel();
  };

  return self;
}

