var dgram = require('dgram');
var should = require('should');
var matelight = require('../lib/mathelight.js');

describe("client", function(){

  it("should have 'matelight.cbrp3.c-base.org' as default host", function(){
    var m = matelight.connect();
    m.HOST.should.equal("matelight.cbrp3.c-base.org");
  });
  it("should have port 1337 as default port", function(){
    var m = matelight.connect();
    m.PORT.should.equal(1337);
  });
  it("should us the given host", function(){
    var m = matelight.connect("localhost");
    m.HOST.should.equal("localhost");
  });
  it("should us the given port", function(){
    var m = matelight.connect("localhost", 1773);
    m.PORT.should.equal(1773);
  });
  it("should send 1924 byte long messages", function(done){
    var listener = dgram.createSocket('udp4', function(message) {
      message.should.have.length(1924);
      listener.on('close', done);
      listener.close();
    });
    listener.bind(19902, function() {
      var m = matelight.connect('localhost', 19902);
      m.startLoop();
    });
  });
});
