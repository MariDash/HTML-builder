const process = require('process');
const readline = require('readline');
const path = require('path');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

fs.writeFile(path.join(__dirname, 'text.txt'), '', {}, (err) => {
  if (err) throw err;
});

function writeText(text) {
  if (text === 'exit' || text === 'exit ') {
    process.exit();
  } else {
    fs.appendFile(path.join(__dirname, 'text.txt'), `${text}\n`, (err) => {
      if (err) throw err;
    });
  }
}

rl.question('What do you want to write to the new file?\n', (answer) => {
  writeText(answer);
});

rl.on('line', (line) => {
  writeText(line);
});

process.on('exit', () => {
  console.log(`*** Good luck! ***`);
});
