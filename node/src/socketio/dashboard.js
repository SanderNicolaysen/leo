import Inquiry from '../database/models/inquiry';
import Appointment from '../database/models/appointment';
import Booths from '../database/models/booth';
import _ from 'lodash';

import auth from './auth';

let _io = undefined;

let queueCount;
let inprogressCount;
let activeQueueNumbers;
let next;
let inquiries;
let filteredInquiries;
let appointments;

export function register(io) {
  _io = io;
  let dashboard = io.of('/dash');

  dashboard.on('connection', function(socket) {
    // Stop here if the socket doesn't contain a valid session (authenticated user)
    if (!auth(socket)) {
      return;
    }

    console.log(`${socket.id} connected`);

    socket.on('disconnect', () => console.log(`${socket.id} disconnected`));

    socket.on('init', () => {
      notify(socket);
      socket.emit('appointments', appointments);
    });
  });
}

export async function notifyQueueChange() {
  if (_io === undefined) {
    console.error('socketio instance not registered in socketio/dashboard.js');
    return;
  }

  // Update queue stats
  await update();

  // Notify authorized clients
  const authorizedClients = _.filter(_io.of('/dash').connected, socket => auth(socket));
  authorizedClients.forEach(socket => {
    notify(socket);
  });
}

export async function notifyAppointmentsChange() {
  try {
    appointments = await Appointment.find({}).exec();
  } catch (error) {
    console.log(error);
    return;
  }

  const authorizedClients = _.filter(_io.of('/dash').connected, socket => auth(socket));
  authorizedClients.forEach(socket => {
    socket.emit('appointments', appointments);
  });
}

async function notify(socket) {
  socket.emit('stats', ({ queue: queueCount, inprogress: inprogressCount, active: activeQueueNumbers, next: next }));
  socket.emit('inquiries', filteredInquiries);
}

async function update() {
  try {
    inquiries = await Inquiry.find({}).exec();
    filteredInquiries = _.filter(inquiries, i => i.status !== 'Ferdig');
  } catch (error) {
    console.log(error);
    return;
  }

  queueCount = _.sumBy(inquiries, (o) => { return o.status !== 'Ferdig' ? 1 : 0; });
  inprogressCount = _.sumBy(inquiries, (o) => { return o.status === 'Behandles' ? 1 : 0; });

  // Find the queuenumbers that are currently being served
  activeQueueNumbers = await Booths.find({}, ).select('-_id num queueNumber').exec();

  // Map the points of an inquiry to the inquiry in a new array
  inquiries = await Promise.all(_.map(inquiries, async function (i) {
    i.points = await i.getPoints();
    return i;
  }));

  // Get the inquiry with the most points
  const nextInquiry = _.maxBy(_.filter(inquiries, i => i.status === 'Venter' || i.status === 'Skriver'), 'points');
  if (nextInquiry) next = nextInquiry.inquiry_id;
}