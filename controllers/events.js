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

const updateEvent = async (req, res) => {

  const eventId = req.params.id; // /:id  of the event

  try {
    
    const oldEvent  = await Event.findById(eventId);

    if (!oldEvent) {
      res.status(404).json({
        ok: false,
        msg: 'No existe un evento con ese id',
      })
    }


    // verify is the same person who is updating
    if (oldEvent.user.toString() !== req.uid) {
      // console.log(oldEvent.user.toString())
      // console.log(req.uid)
      // return !important
      return res.status(401).json({
        ok: false,
        msg: 'No puedes actualizar este evento',
      })
    }

    // set the new event with correct data
    const newEvent = {
      ...req.body,
      user: req.uid
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

    res.json({
      ok: true,
      msg: 'update event',
      event: updatedEvent
    })


  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
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