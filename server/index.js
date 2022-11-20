const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');



const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const {endBlink,oneByOne,endBlinkRed, blinkRed,blinkGreen,tryRed,tryGreen,endBlinkGreen, blinkYellow,tryYellow,endBlinkYellow,servo, flowingLeds,sensor } = require('./raspberryfun');

const router = require('./router');



const PORT = process.env.PORT || 5000
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);
let createdTime = Date.now();

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    // socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`, createdTime});
    // socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    if(message === 'blink red'){
      blinkRed()
    }
    
    if(message === 'all'){
      oneByOne()
    }
    if(message === 'exit'){
      endBlink()
    }
    
    else if(message === 'red'){
      tryRed()
    }
    else if(message === 'stop red'){
      endBlinkRed()
    }
    else if(message === 'blink green'){
      blinkGreen()
    }
    
    else if(message ==='green'){
      tryGreen()
    }
    else if (message ==='stop green'){
      endBlinkGreen()
    }
    else if(message === 'blink yellow'){
      blinkYellow()
    }
    
    else if(message ==='yellow'){
      tryYellow()
    }
    else if(message ==='stop yellow'){
      endBlinkYellow()
    }
    else if(message ==='flowing leds'){
      flowingLeds()
    }
    else if(message ==='run servo'){
      servo()
    }
    else if(message ==='sensor'){
      sensor()
    }
    
    

    io.to(user.room).emit('message', { user: user.name, text: message,createdTime });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});


server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

