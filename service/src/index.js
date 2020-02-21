const 
app = require('express')();
http = require('http').createServer(app);
io = require('socket.io')(http);

const PORT = 8001

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  
  io.emit('loadChatHistory',messagesFromDB);
  io.emit('loadUsers',nicknames);

  console.log(' New connection established!');

  socket.on('newChatMessage', (data) => { 
    io.emit('newChatMessage', data);
    messagesFromDB.push(data)
    console.log('Message received: ',data);
    // TODO: Save new message in database
  });

  socket.on('disconnet', () => { 'Bailed out!'});
});

http.listen(PORT, function(){
  console.log(`listening on *:${PORT}`);
});



messagesFromDB = [ 
  {'user':' John Doe','body':'Fake Message from Mongo','datetime':Date.now(),'isUserMessage':true},
  {'user':' John Doe','body':'Fake Message from Mongo','datetime':Date.now(),'isUserMessage':true},
  {'user':' John Doe','body':'Fake Message from Mongo','datetime':Date.now(),'isUserMessage':true},
  {'user':' John Doe','body':'Fake Message from Mongo','datetime':Date.now(),'isUserMessage':true},
  {'user':' John Doe','body':'Fake Message from Mongo','datetime':Date.now(),'isUserMessage':true}

]

var nicknames = [
  'Lucas',
  'Lucas1'
]