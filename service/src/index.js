const 
app = require('express')();
http = require('http').createServer(app);
io = require('socket.io')(http);

const PORT = 8001

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('Connection established!');
  //TODO: Create event for user joined and emit message to front end
  
  socket.on('newChatMessage', (data) => { 
    io.emit('newChatMessage', data);
    console.log('Message received: ',data);
    // TODO: Save new message in database
  });

  socket.on('disconnet', function() { 'Bailed out!'});
});

http.listen(PORT, function(){
  console.log(`listening on *:${PORT}`);
});