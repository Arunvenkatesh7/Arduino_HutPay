const express = require('express');
const { SerialPort } = require('serialport');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ReadlineParser } = require('@serialport/parser-readline');

const app = express();
const port = 5000;

// Update this to the correct serial port path for Windows
const serialPortPath = 'COM13'; // Make sure this is the correct port
const serialPort = new SerialPort({ path: serialPortPath, baudRate: 9600 });

serialPort.on('error', function(err) {
  console.log('Error: ', err.message);
});

app.use(bodyParser.json());
app.use(cors());

const parser = new ReadlineParser({ delimiter: '\r\n' });
serialPort.pipe(parser);

let latestData = '';

parser.on('data', data => {
  latestData = data;
  console.log(`Received data: ${data}`);
});

app.get('/data', (req, res) => {
  res.json({ data: latestData });
});

app.post('/debit', (req, res) => {
  const { amount } = req.body;
  if (amount && serialPort.isOpen) {
    serialPort.write(`${amount}\n`, (err) => {
      if (err) {
        console.log('Error on write: ', err.message);
        res.status(500).send('Error writing to serial port');
      } else {
        console.log("amount deducted starts: ",amount);
        res.send('Amount sent to Arduino');
      }
    });
  } else {
    res.status(400).send('Invalid request');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


