import Inquiry from './database/models/inquiry';

export function queueNumberDisplay(io) {
  io.of('/queueNumberDisplay').on('connection', function(socket){
    console.log('a user connected');
    console.log(socket.id + ' is connected');
  
    socket.on('kall inn', function(id){
      console.log('hello' + id);
      // Event will be received by everyone
      io.of('queueNumberDisplay').emit('kall inn', id);
    });
  
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });
}

export function booth(io) {
  io.of('/booth').on('connection', socket => {
    io.emit('emiting booth inquiry');
    console.log('connected to booth');
  });
}