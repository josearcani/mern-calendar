const { response } = require('express');
const getEvents = (req, res) => {
  res.json({
    ok: true,
    msg: 'get all events',
  })
}


const createEvent = (req, res) => {
  const { body } = req;
  res.json({
    ok: true,
    msg: 'create event',
    data: body
  })
}

const updateEvent = (req, res) => {
  const { id } = req.params; // /:id  endpoint
  const { body } = req;
  res.json({
    ok: true,
    msg: 'update event',
    id,
    data: body
  })
}

const deleteEvent = (req, res) => {
  res.json({
    ok: true,
    msg: 'delete event',
  })
}

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
}