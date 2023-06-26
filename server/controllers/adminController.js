// const User = require("../models/UserModel");
//
//
// module.exports = {
//     getAllUsers: async (req, res) => {
//         console.log('abc')
//         // try {
//         //     const users = await User.find();
//         //     res.json(users);
//         // } catch (error) {
//         //     console.error(error);
//         //     res.status(500).json({ message: 'Internal server error' });
//         // }
//     },
//     // deleteTopic: async (req, res) => {
//     //     try {
//     //         const { id } = req.params;
//     //         const topic = await Topic.findById(id).populate("author", {
//     //             _id: 0,
//     //             username: 1,
//     //             isAdmin: 1,
//     //         });
//     //         if (!topic) {
//     //             return res.status(404).json({
//     //                 message: "Could not find topic for the provided ID.",
//     //             });
//     //         }
//     //         if (req.user.username !== topic.author.username && !topic.author.isAdmin) {
//     //             return res.status(403).json({
//     //                 message: "You are not allowed to delete this topic",
//     //             });
//     //         }
//     //         await Comment.deleteMany({ parentTopic: id });
//     //         await Topic.findByIdAndDelete(id);
//     //         return res.json({ topicId: id, message: "Topic deleted successfully!" });
//     //     } catch (err) {
//     //         console.log(err.message);
//     //     }
//     // },
// };
