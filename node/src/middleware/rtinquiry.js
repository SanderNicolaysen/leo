import Inquiry from '../database/models/inquiry';
import { notifyQueueChange } from '../socketio/dashboard';

const auth = (socket) => { return socket.request.session && socket.request.session.passport && socket.request.session.passport.user; };

export default function (io) {
  return async function (req, res, next) {
    try {
      const inquiries = await Inquiry.find({}).sort({ _id: 1 }).exec();

      // Find all connected sockets in /booth and send only to those that are authenticated
      for (const socketId in io.of('/booth').connected) {
        const socket = io.of('/booth').connected[socketId];
        if (auth(socket)) socket.emit('get', inquiries);
      }

      // Update the dashboard
      notifyQueueChange();

      res.end();
    } catch (error) {
      return next(error);
    }  
  };
}
