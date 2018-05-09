
var app = require('express')();
var express = require('express');
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/build/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('chat', function (msg) {
        console.log('>> msg', msg);
        io.emit('chat', msg)
    })
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
