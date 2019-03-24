import Inquiry from '../database/models/inquiry';

export default function (io) {
  return async function (req, res, next) {
    try {
      const inquiries = await Inquiry.find({}).sort({ _id: 1 }).exec();
      io.of('booth').emit('get', inquiries);
      res.end();
    } catch (error) {
      return next(error);
    }  
  };
}
