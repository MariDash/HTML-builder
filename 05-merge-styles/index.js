const fs = require('fs');
const path = require('path');

const bundleFile = path.join(__dirname, 'project-dist', 'bundle.css');

fs.writeFile(bundleFile, '', {}, (err) => {
  if (err) throw err;
});

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  if (err) throw err;
  const output = fs.createWriteStream(bundleFile);
  files.forEach((file) => {
    if (path.extname(file) === '.css') {
      const input = fs.createReadStream(path.join(__dirname, 'styles', file));
      input.pipe(output);
    }
  });
});
