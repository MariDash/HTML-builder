const path = require('path');
const fs = require('fs');

const file = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(file, 'utf-8');

readableStream.on('data', (data) => console.log(data));
