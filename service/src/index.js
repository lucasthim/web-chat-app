var 
	// debug = require('debug')('express-socket.io-session:example'),
	app = require('express')(),
	server = require('http').createServer(app),
	io = require('socket.io')(server),
	session = require('express-session')({
		secret: 'my-secret',
		resave: true,
		saveUninitialized: true
	}),
	sharedsession = require("express-socket.io-session");
	cors = require("cors");
	corsOptions = {
		origin: 'http://192.168.0.12:3000',
		credentials: true };
	cookieParser = require('cookie-parser');
	bodyParser = require('body-parser');

app.use(session);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser());


io.use(
	sharedsession(session, {
		autoSave: true
	})
);

// set a cookie
// app.use(function (req, res, next) {
// 	// check if client sent cookie
// 	var cookie = req.cookies.cookieName;
// 	if (cookie === undefined)
// 	{
// 	  // no: set a new cookie
// 	  var randomNumber=Math.random().toString();
// 	  randomNumber=randomNumber.substring(2,randomNumber.length);
// 	  res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
// 	  console.log('cookie created successfully');
// 	} 
// 	else
// 	{
// 	  // yes, cookie was already present 
// 	  console.log('cookie exists', cookie);
// 	} 
// 	next(); // <-- important!
// });

app.get('/login/:nickname', function(req, res) {
	const nickname = req.params.nickname; 
	const nicknameAvailable = !nicknameCollection.includes(nickname);

	if(nicknameAvailable) {
		nicknameCollection.push(nickname);
	}
	res.status(200).send({nicknameSaved:nicknameAvailable});

});

app.get('/logout/:nickname', function(req, res) {
	const nickname = req.params.nickname; 
	if(nicknameCollection.includes(nickname)) {
		nicknameCollection.splice(nicknameCollection.indexOf(nickname),1);
	}

	res.status(200).send({logout:true});
});

app.post('/logout', function(req, res) {
	const logoutMessage = req.body;
	console.log(req.body)
	const nickname = logoutMessage.user; 
	if(nicknameCollection.includes(nickname)) {
		nicknameCollection.splice(nicknameCollection.indexOf(nickname),1);
	}

	// io.emit('newMessage',logoutMessage);
	res.status(200).send({logout:true});
});

app.use(require('express').static(__dirname));

io.on('connection', function(socket) {
	console.log('Connection established')

	socket.on('userConnected', (data) => {
		console.log('new user',data)
		messageCollection.push(data);
		io.emit('newMessage', data);
	});

	socket.on('loadMessages', () => {
		socket.emit('loadMessages', messageCollection);
	});

  	socket.on('sendMessage', (data) => { 
		messageCollection.push(data)
		io.emit('newMessage', data);
		console.log('Message received: ',data);
		// TODO: Save new message in database
  	});

	socket.on('disconnet', (nickname) => { 
		console.log(nickname,'disconnected')
	});

});
  
const PORT = 8001;
server.listen(PORT,'192.168.0.12', function(){
  console.log(`listening on *:${PORT}`);
});


messageCollection = [ 
	{'user':' John Doe','body':'Fake Message from server','datetime':Date.now(),'isUserMessage':true, 'isSystemMessage':false},
	{'user':' John Doe','body':'Fake Message from server','datetime':Date.now(),'isUserMessage':true, 'isSystemMessage':false},
	{'user':' John Doe','body':'Fake Message from server','datetime':Date.now(),'isUserMessage':true, 'isSystemMessage':false},
	{'user':' John Doe','body':'Fake Message from server','datetime':Date.now(),'isUserMessage':true, 'isSystemMessage':false},
	{'user':' John Doe','body':'Fake Message from server','datetime':Date.now(),'isUserMessage':true, 'isSystemMessage':false}
  
  ];
  
  nicknameCollection = [
	  'Lucas',
	  'Lucas1'
  ];
