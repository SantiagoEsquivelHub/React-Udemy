const { Schema, model } = require("mongoose");

const eventSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: false
    },
    start: {
        type: Date,
        required: false
    },
    end: {
        type: Date,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }


});

eventSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();

    object.id = _id;

    return object;
});

module.exports = model("Event", eventSchema);