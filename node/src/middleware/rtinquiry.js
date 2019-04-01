import Inquiry from '../database/models/inquiry';

const auth = (socket) => { return socket.request.session && socket.request.session.passport && socket.request.session.passport.user; };

export default function (io) {
  return async function (req, res, next) {
    try {
      const inquiries = await Inquiry.find({}).sort({ _id: 1 }).exec();

      // Find all connected sockets and send only to those that are authenticated
      for (const socketId in io.of('/booth').connected) {
        const socket = io.of('/booth').connected[socketId];
        if (auth(socket)) socket.emit('get', inquiries);
      }
      res.end();
    } catch (error) {
      return next(error);
    }  
  };
}
