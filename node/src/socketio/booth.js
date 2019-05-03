import Inquiry from '../database/models/inquiry';
import { notifyQueueChange } from './dashboard';
import mongoose from 'mongoose';

import auth from './auth';

export function update(io) {
  let booth = io.of('/booth');

  booth.on('connection', function(socket) {
    console.log(`${socket.id} connected`);

    socket.on('disconnect', () => console.log(`${socket.id} disconnected`));

    // Stop here if the socket doesn't contain a valid session (authenticated user)
    if (!auth(socket)) {
      return;
    }

    socket.on('inform user', function(inquiry_id) {
      booth.emit('inform user', inquiry_id);
    });
    

    socket.on('update', async function(data) {
      await updateInquiry(data, booth, socket);
      notifyQueueChange();
    });

    socket.on('delete', async function(data) {
      await deleteInquiry(data, booth);
      notifyQueueChange();
    });
  });
}

async function updateInquiry(data, booth, socket) {
  if (!mongoose.Types.ObjectId.isValid(data._id)) {
    booth.emit('update', new Error(400));    
    return;
  }
  
  try {
    let inquiry = await Inquiry.findById(data._id).exec();
    if (inquiry === null) {
      booth.emit('update', new Error(404));
      return;
    }

    // Authorize
    if (inquiry.key !== data.key) {
      booth.emit('update', new Error(401));
      return;
    }

    for (const prop in data) {
      inquiry[prop] = data[prop];
    }

    await Inquiry.updateOne({_id: inquiry._id}, {$set: inquiry }).exec();
    socket.broadcast.emit('update', inquiry);
  } catch (error) {
    booth.emit('update', error);
  }
}

// Delete inquiry
async function deleteInquiry(data, booth) {
  try {
    const inquiry = await Inquiry.findById(data._id).exec();

    if (inquiry === null) {
      throw new Error(404);
    }

    // Authorize
    if (inquiry.key !== data.key) {
      throw new Error(401);
    }

    booth.emit('delete', inquiry);
    await inquiry.delete();

  } catch (error) {
    throw error;
  }
  
}