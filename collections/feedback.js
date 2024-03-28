const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    feedbackId: {
        type: String
    },
    feedbackTitle: {
        type: String
    },
    feedbackContent: {
        type: String
    },
    feedbackCreated: {
        type: Date
    },
    feedbackCreator: {
        type: String
    },
    feedbackSeen: {
        type: Boolean,
        default: 0
    }
});

const Feedback = mongoose.model("feedback", FeedbackSchema);

// // Function to initialize or update predefined data
// const initializePredefinedData = async () => {
//     // Check if predefined data already existswha
//     const existingTodos = await Feedback.find({});

//     // If no predefined data, insert it
//     if (existingTodos.length === 0) {
//         const predefinedData = [
//             {
//                 feedbackId: "feedback1",
//                 feedbackTitle: "feedback lele py",
//                 feedbackContent:' 1Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel magnam, qui consequatur blanditiis quia nisi nostrum sequi doloremque ratione esse similique reprehenderit sint placeat hic nulla voluptate exercitationem ex?',
//                 feedbackCreator: "ASU00001"
//             },
//             {
//                 feedbackId: "feedback2",
//                 feedbackContent:' 2Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel magnam, qui consequatur blanditiis quia nisi nostrum sequi doloremque ratione esse similique reprehenderit sint placeat hic nulla voluptate exercitationem ex?',
//                 feedbackTitle: "Sad",
//                 feedbackCreator: "ASU00001"
//             },
//             {
//                 feedbackId: "feedback3",
//                 feedbackTitle: "Unlisted",
//                 feedbackContent:' 3Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vel magnam, qui consequatur blanditiis quia nisi nostrum sequi doloremque ratione esse similique reprehenderit sint placeat hic nulla voluptate exercitationem ex?',
//                 feedbackCreator: "ASU00001"
//             }
//         ];

//         await Feedback.insertMany(predefinedData)
//         // (predefinedData);
//     }
// };

// initializePredefinedData();



module.exports = Feedback;