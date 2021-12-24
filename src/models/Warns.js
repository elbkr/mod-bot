const { Schema, model } = require("mongoose");

module.exports = model(
    "Warns",
    new Schema(
        {
            _id: {type: String},
            guildID: {type: Array, default: null},
            warns: {type: Array, default: null},
        },
        { versionKey: false }
    )
);
