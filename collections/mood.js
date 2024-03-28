const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MoodSchema = new Schema({
    moodId: {
        type: String
    },
    moodName: {
        type: String
    },
    moodCover: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2023/02/15/13/06/mood-7791841_1280.png"
    },
    moodCreated: {
        type: Date
    },
    moodCreator: {
        type: String
    },
    moodSongs: {
        default: [],
        type: [String]
    },
    moodLikeCount: {
        default: 0,
        type: Number
    },
    moodDislikeCount: {
        default: 0,
        type: Number
    }
});

const Mood = mongoose.model("mood", MoodSchema);


module.exports = Mood;