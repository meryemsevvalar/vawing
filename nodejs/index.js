const express = require('express');
const kafka = require('./src/middlewares/kafka-conn');
const routes = require('./src/routes/message');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', routes);

const start = async () => {
  await kafka.connectProducer();

  app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
  });
};

start().catch(console.error);

