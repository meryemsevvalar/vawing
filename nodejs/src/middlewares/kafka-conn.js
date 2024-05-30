const { Kafka, logLevel } = require('kafkajs');

const logCreator = (logLevel) => ({ namespace, level, label, log }) => {
  const { message, ...extra } = log;
  if (level === logLevel.ERROR) {
    console.error(`[${label}] ${message}`, extra);
  }

  if (message.includes("message sent")) {
    console.log(`[${label}] ${message}`, extra);
  }
};

const kafka = new Kafka({
  clientId: 'node-app',
  brokers: [process.env.KAFKA_BROKER],
  logLevel: logLevel.ERROR, // Set the log level to ERROR
  logCreator,
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
};

const sendMessage = async (message) => {
  const topic = 'nodejs-to-go';
  await producer.send({
    topic: topic,
    messages: [{ value: message }],
  });
  console.log(`messagesent: Message sent to topic ${topic}`);
};

module.exports = {
  connectProducer,
  sendMessage,
};
