// note, io(<port>) will create a http server for you

var express         = require('express');
var bodyParser      = require('body-parser');
var path            = require('path'); // модуль для парсинга пути
var app = express();



var data = {
      visible: false,
      terminals: [{id: 10111},{id: 222220}]
    };
app.use(bodyParser()); // стандартный модуль, для парсинга JSON в запросах
app.get('/api', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(data);
});

app.listen(1489, function(){
    console.log('Express server listening on port 1489');
});


var io = require('socket.io')(1488);

io.on('connection', function (socket) {
    
    // io.emit('this', { will: 'be received by everyone'});
    //
    socket.on('private message', function (from, msg) {
        console.log('I received a private message by ', from, ' saying ', msg);
    });
    //
    socket.on('disconnect', function () {
        io.emit('user disconnected');
    });

    socket.on('msg', function () {
        socket.emit('msg', "123123");
    });

    socket.on('get terminals', () => {
        socket.emit('terminals', data.terminals);
    })
});


