const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongsSchema = new Schema({
    //1
    trackid: {
        type: String
    },
    //2
    songName: {
        type: String
    },
    //3
    songAlbumCover: {
        type: String
    },
    //4
    artistName: {
        type: String
    },
    //5
    mood: {
        type: String,
        default: 'Not Set'
    },
    //6
    genre: {
        type: String,
        default: 'Not Set'
    },
    //7
    url: {
        type: String
    },
    //8
    songLikeCount: {
        type: Number,
        default: 0
    },
    //9
    songDisikeCount: {
        type: Number,
        default: 0
    },
    //10
    songUploader: {
        type: String,
        default: 'admin'
    },
    //11
    songUploaded: {
        type: Date
    },
    //12
    songListenedMins: {
        type: Number,
        default: 0
    }
});


const Songs = mongoose.model("Songs", SongsSchema);


module.exports = Songs;