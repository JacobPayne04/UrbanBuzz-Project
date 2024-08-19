const User = require('../models/user.model');
const Message = require('../models/message.model');

const sendMessage = async (req, res) => {
    const { senderId, receiverId, content } = req.body;

    try {
        const message = new Message({
            content,
            sender: senderId,
            receiver: receiverId
        });

        await message.save();

        res.status(200).json({ message: 'Message sent successfully', message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// const getMessages = async (req, res) => {
//     const { userId } = req.params;

//     try {
//         const messages = await Message.find({ $or: [{ sender: userId }, { receiver: userId }] }).populate('sender receiver');
//         res.status(200).json(messages);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

const getMessages = async (req, res) => {
    try {
        const messages = await Message.find()
            .populate('sender', 'username')
            .populate('receiver', 'username');
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

module.exports = { sendMessage, getMessages };