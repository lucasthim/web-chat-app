const 
express = require('express');
cors = require('cors');

const PORT = 8001

var app = express();
app.use(cors());
app.use(express.cookieParser());
app.use(express.session({secret: 'secret', key: 'express.sid'}));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/nickname/:nickname', function(req, res){

  var nickname = req.params.nickname; 
  var nicknameAvailable = !nicknameCollection.includes(nickname);
  if(nicknameAvailable){
    nicknameCollection.push(nickname);
  }
  res.send({nicknameSaved:nicknameAvailable});
});



http = require('http').createServer(app);
io = require('socket.io')(http);

io.on('connection', function(socket){
  
  io.emit('loadChatHistory',messageCollection);
  io.emit('loadUsers',nicknames);

  console.log(' New connection established!');

  socket.on('newChatMessage', (data) => { 
    io.emit('newChatMessage', data);
    messageCollection.push(data)
    console.log('Message received: ',data);
    // TODO: Save new message in database
  });

  socket.on('disconnet', () => { 'Bailed out!'});
});



http.listen(PORT, function(){
  console.log(`listening on *:${PORT}`);
});



messageCollection = [ 
  {'user':' John Doe','body':'Fake Message from Mongo','datetime':Date.now(),'isUserMessage':true},
  {'user':' John Doe','body':'Fake Message from Mongo','datetime':Date.now(),'isUserMessage':true},
  {'user':' John Doe','body':'Fake Message from Mongo','datetime':Date.now(),'isUserMessage':true},
  {'user':' John Doe','body':'Fake Message from Mongo','datetime':Date.now(),'isUserMessage':true},
  {'user':' John Doe','body':'Fake Message from Mongo','datetime':Date.now(),'isUserMessage':true}

]

var nicknameCollection = [
  'Lucas',
  'Lucas1'
]