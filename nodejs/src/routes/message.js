const express = require('express');
const router = express.Router();
const kafka = require('../middlewares/kafka-conn');

const kafkaMiddleware = async (req, res) => {

    const { message } = req.body;

    if (!message) {
        return res.status(400).send('Message are required');
    }

   try {
        await kafka.sendMessage( message);
        res.status(200).send('Message sent successfully');
    } catch (error) {
        console.error('Failed to send message', error);
        res.status(500).send('Failed to send message');
    }
};

router.post('/message', kafkaMiddleware);

module.exports = router;


