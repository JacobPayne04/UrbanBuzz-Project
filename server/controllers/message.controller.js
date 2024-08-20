const User = require('../models/user.model');
const Message = require('../models/message.model');

const sendMessage = async (req, res) => {
    const { senderId, receiverId, content } = req.body;

    try {
        // Create a new message
        const message = new Message({
            content,
            sender: senderId,
            receiver: receiverId
        });

        // Save the message to the database
        await message.save();

        // Populate sender and receiver if you want to return full details
        const populatedMessage = await Message.findById(message._id)
            .populate('sender', 'username')
            .populate('receiver', 'username');

        // Send a success response
        res.status(200).json({
            message: 'Message sent successfully',
            data: populatedMessage
        });
    } catch (error) {
        // Send an error response
        res.status(500).json({ error: error.message });
    }
};


const GetMessagesByReceiver = async (req, res) => {
    const { receiverId } = req.params; // Assuming the receiver's ID is passed as a URL parameter

    try {
        const messages = await Message.find({ receiver: receiverId }) // Filter messages by receiver's ID
            .populate('sender', 'username')
            .populate('receiver', 'username');
        
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};


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

module.exports = { sendMessage, getMessages, GetMessagesByReceiver };