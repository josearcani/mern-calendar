const Event = require('../models/Event');

const getEvents = async (req, res) => {

  const eventDb = await Event.find()
                            .populate('user', 'name');
                            // .populate('user', 'name email');
  
  res.json({
    ok: true,
    msg: 'get all events',
    event: eventDb,
  })
}


const createEvent = async (req, res) => {

  const event = new Event(req.body);

  try {
    event.user = req.uid;
    const eventDb = await event.save();
    res.json({
      ok: true,
      msg: 'create event',
      event: eventDb,
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
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