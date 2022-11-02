const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {

    const events = await Event.find().populate("user", "name");

    res.status(200).json({
        ok: true,
        events
    })
}

const createEvent = async (req, res = response) => {


    const event = new Event(req.body);

    try {
        event.user = req.uid;
        const savedEvent = await event.save();

        res.status(200).json({
            ok: true,
            event: savedEvent
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Talk to the admin"
        })
    }


}

const uploadEvent = async (req, res = response) => {
    const { id } = req.params;
    const { uid } = req;

    try {

        const event = await Event.findById(id);

        if (!event) {
            res.status(404).json({
                ok: false,
                msg: "Event does not exist with this id"
            })
        }


        if (event.user.toString() !== uid) {
            res.status(404).json({
                ok: false,
                msg: "You can not edit this event"
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const uploadedEvent = await Event.findByIdAndUpdate(id, newEvent, { new: true });

        res.status(200).json({
            ok: true,
            event: uploadedEvent
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Talk to the admin"
        })
    }


}

const deleteEvent = async (req, res = response) => {
    const { id } = req.params;
    const { uid } = req;

    try {

        const event = await Event.findById(id);

        if (!event) {
            res.status(404).json({
                ok: false,
                msg: "Event does not exist with this id"
            })
        }


        if (event.user.toString() !== uid) {
            res.status(404).json({
                ok: false,
                msg: "You can not delete this event"
            })
        }


        await Event.findByIdAndDelete(id);

        res.status(200).json({
            ok: true,
            msg: "Event deleted"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Talk to the admin"
        })
    }


}

module.exports = {
    getEvents,
    createEvent,
    uploadEvent,
    deleteEvent
}