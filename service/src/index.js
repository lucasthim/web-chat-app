const 
app = require('express')();
http = require('http').createServer(app);
io = require('socket.io')(http);

const PORT = 8001

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('connection established');

  socket.on('message', function (msg) { 
    console.log('Message received: ',msg);
  });
  socket.on('disconnet', function() { 'Bailed out!'});
});

http.listen(PORT, function(){
  console.log(`listening on *:${PORT}`);
});