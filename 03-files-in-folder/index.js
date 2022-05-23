const fs = require('fs');
const path = require('path');

fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const filePermission = path.extname(file.name);
      const fileName = path.basename(file.name, filePermission);
      fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, file) => {
        if (err) throw err;

        const fileSize = file.size / 1000;
        if (file.isFile()) {
          console.log(
            `${fileName} - ${filePermission.slice(1)} - ${fileSize}kb`
          );
        }
      });
    });
  }
);
