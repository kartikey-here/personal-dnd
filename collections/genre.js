const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    genreId: {
        type: String
    },
    genreName: {
        type: String
    },
    genreCover: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2023/02/15/13/06/genre-7791841_1280.png"
    },
    genreCreated: {
        type: Date
    },
    genreSongs: {
        default: [],
        type: [String]
    },
    genreCreator: {
        type: String
    },
    genreLikeCount: {
        default: 0,
        type: Number
    },
    genreDislikeCount: {
        default: 0,
        type: Number
    }
});

const Genre = mongoose.model("Genre", GenreSchema);


module.exports = Genre;

// // Function to initialize or update predefined data
// const initializePredefinedData = async () => {
//     // Check if predefined data already exists
//     const existingTodos = await Genre.find({});

//     // If no predefined data, insert it
//     if (existingTodos.length === 0) {
//         const predefinedData = [
//             {
//                 genreId: "GENRE1",
//                 genreName: "Rock",
//                 genreSongs: [],
//                 genreCreator: "ASU00001"
//             },
//             {
//                 genreId: "GENRE2",
//                 genreName: "Pop",
//                 genreSongs: [],
//                 genreCreator: "ASU00001"
//             },
//             {
//                 genreId: "GENRE3",
//                 genreName: "Unlisted",
//                 genreSongs: [],
//                 genreCreator: "ASU00001"
//             }
//         ];

//         await Genre.insertMany(predefinedData)
//         // (predefinedData);
//     }
// };

// initializePredefinedData();

