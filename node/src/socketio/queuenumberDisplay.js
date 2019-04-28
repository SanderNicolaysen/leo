import auth from './auth';
import Booth from '../database/models/booth';

export function updateQueueNumberDisplay(io) {

  io.of('/queueNumberDisplay').on('connection', function(socket) {
    console.log(`${socket.id} connected`);

    // When client disconnects from server
    socket.on('disconnect', () => console.log(`${socket.id} disconnected`));
    
    if (!auth(socket)) {
      return;
    }

    socket.on('summon', async function (qndNumber) {
      const booths = await Booth.find({}).exec();
      const booth = booths.find(b => b.ip === socket.request.connection.remoteAddress);

      if (booth !== null) {
        booth.queueNumber = qndNumber;
        await booth.save();
        
        io.of('queueNumberDisplay').emit('display', booths);
      }
    });
  });
}