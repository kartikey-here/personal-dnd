const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayListSchema = new Schema({
    playListId: {
        type: String
    },
    playListName: {
        type: String
    },
    playListCover: {
        type: String,
        default:'https://www.iconarchive.com/download/i95109/trayse101/basic-filetypes-2/playlist.ico'
    },
    playListSongs: {
        default: [],
        type: [String]
    },
    playListCreated: { 
        type: Date
    },
    playListCreator: {
        type: String
    },
    collaborative: {
        default: false,
        type: Boolean
    },
    publik: {
        default: false,
        type: Boolean
    },
    playListLikeCount: {
        default: 0,
        type: Number
    },
    playListDislikeCount: {
        default: 0,
        type: Number
    }
});



const PlayList = mongoose.model("PlayList", PlayListSchema);

module.exports = PlayList;