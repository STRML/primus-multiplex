var multiplex = require('../../');
var rooms = require('primus-rooms');
var Primus = require('primus');
var http = require('http');
var server = http.createServer();


// THE SERVER
var primus = new Primus(server, { transformer: 'sockjs', parser: 'JSON' });

// Add room functionality to primus
primus.use('rooms', rooms);
primus.use('multiplex', multiplex);
//primus.save('test.js');

var ann = primus.channel('ann');
var bob = primus.channel('bob');
var tom = primus.channel('tom');

// Server stuff
ann.on('connection', function(spark){
  console.log('connected to ann');
  // testing regular
});

// Server stuff
bob.on('connection', function(spark){
  console.log('connected to bob');
});

// Server stuff
tom.on('connection', function(spark){
  console.log('connected to tom');
  

  setInterval(function () {
    spark.write('hoola tom');
  }, 3000);
});


// THE CLIENT
function setClient () {

  var Socket = primus.Socket;
  var socket = new Socket('ws://localhost:8080');

  var ann = socket.channel('ann');
  var bob = socket.channel('bob');
  var tom = socket.channel('tom');

  ann.on('data', function (msg) {
    console.log('[ANN] ===> ' + msg);
  });

  tom.on('data', function (msg) {
    console.log('[TOM] ===> ' + msg);
  });

  bob.on('BOB', function (msg) {
    console.log('[TOM] ===> ' + msg);
  });


  /*socket.on('data', function (data) {
    console.log('===>', data);
  });*/

  setTimeout(function () {
    //socket.write([3, 8, 'ann']);
  }, 5000);

}

// Set first client
setTimeout(function () {
  setClient();
}, 0);

server.listen(process.env.PORT || 8080, function(){
  console.log('\033[96mlistening on localhost:9000 \033[39m');
});
