const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) throw err;
  console.log('Папка скопирована');

  fs.readdir(path.join(__dirname, 'files-copy'), (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      fs.unlink(path.join(__dirname, 'files-copy', file), () => {});
    });
  });
});

fs.readdir(path.join(__dirname, 'files'), (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    fs.writeFile(path.join(__dirname, 'files-copy', file), '', {}, (err) => {
      if (err) throw err;

      fs.copyFile(
        path.join(__dirname, 'files', file),
        path.join(__dirname, 'files-copy', file),
        () => {}
      );
    });
  });
});
