const Event = require('../models/Event');

const getEvents = async (req, res) => {

  // const eventDb = await Event.find()
  //                           .populate('user', 'name');
                            // .populate('user', 'name email');

  const [ total, eventDb ] = await Promise.all([
    Event.countDocuments(),
    Event.find().populate('user', 'name')
  ]);
  
  res.json({
    ok: true,
    total,
    events: eventDb,
  })
}


const createEvent = async (req, res) => {

  const event = new Event(req.body);

  try {
    event.user = req.uid;
    const eventDb = await event.save();
    res.json({
      ok: true,
      msg: 'Evento creado',
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
      return res.status(404).json({
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
      msg: 'Evento actualizado',
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

const deleteEvent = async (req, res) => {

  const eventId = req.params.id; // /:id  of the event to delete

  try {
    
    const oldEvent  = await Event.findById(eventId);

    if (!oldEvent) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un evento con ese id',
      })
    }

    // verify is the same person who is deleting
    if (oldEvent.user.toString() !== req.uid) {
      // return !important
      return res.status(401).json({
        ok: false,
        msg: 'No puedes eliminar este evento',
      })
    }

    const deletedEvent = await Event.findByIdAndDelete(eventId, { new: true });

    res.json({
      ok: true,
      msg: 'Evento eliminado',
      event: deletedEvent
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    })
  }
}

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
}
