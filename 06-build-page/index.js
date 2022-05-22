const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) throw err;
});

const originalHtml = fs.createReadStream(
  path.join(__dirname, 'template.html'),
  'utf-8'
);

originalHtml.on('data', (data) => {
  fs.unlink(path.join(__dirname, 'project-dist', 'index.html'), () => {});
  fs.readdir(path.join(__dirname, 'components'), (err, files) => {
    for (let i = 0; i < files.length; i++) {
      let rs = fs.createReadStream(
        path.join(__dirname, 'components', files[i]),
        'utf-8'
      );
      rs.on('data', (code) => {
        data = data.replace(`{{${path.parse(files[i]).name}}}`, code);

        if (i === files.length - 1) {
          fs.appendFile(
            path.join(__dirname, 'project-dist', 'index.html'),
            data,
            (err) => {
              if (err) throw err;
            }
          );
        }
      });
    }
  });
});

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  if (err) throw err;
  const output = fs.createWriteStream(
    path.join(__dirname, 'project-dist', 'style.css')
  );
  files.forEach((file) => {
    if (path.extname(file) === '.css') {
      const input = fs.createReadStream(path.join(__dirname, 'styles', file));
      input.pipe(output);
    }
  });
});

fs.mkdir(
  path.join(__dirname, 'project-dist', 'assets'),
  { recursive: true },
  (err, cb) => {
    if (err) throw err;
    function rec(currentFile, dir) {
      fs.readdir(currentFile, { withFileTypes: true }, (err, files) => {
        if (err) throw err;

        files.forEach((file) => {
          let fileName = path.join(
            __dirname,
            'project-dist',
            'assets',
            `${dir}`,
            `${file.name}`
          );
          if (file.isFile()) {
            fs.writeFile(fileName, '', {}, (err) => {
              if (err) throw err;

              fs.copyFile(
                path.join(__dirname, 'assets', `${dir}`, `${file.name}`),
                fileName,
                () => {}
              );
            });
          } else {
            fs.mkdir(
              path.join(__dirname, 'project-dist', 'assets', `${file.name}`),
              { recursive: true },
              (err) => {
                if (err) throw err;
              }
            );
            rec(path.join(__dirname, 'assets', `${file.name}`), file.name);
          }
        });
      });
    }

    let file = path.join(__dirname, 'assets');
    rec(file);
  }
);
