const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'node_modules')));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('runCode', (code, language) => {
    console.log(`Running ${language} code:`, code);
    executeCode(socket, code, language);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

function executeCode(socket, code, language) {
  const imageMap = {
    javascript: 'node:14',
    python: 'python:3.8',
  };

  const imageName = imageMap[language];

  if (!imageName) {
    socket.emit('codeResult', JSON.stringify({ result: 'Unsupported language', error: true }));
    return;
  }

  const command = `docker run --rm ${imageName} /bin/sh -c "${code}"`;

  exec(command, { maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing code: ${error.message}`);
      socket.emit('codeResult', JSON.stringify({ result: stderr || 'Error executing code', error: true }));
    } else {
      console.log(`Code executed successfully: ${stdout}`);
      socket.emit('codeResult', JSON.stringify({ result: stdout, error: false }));
    }
  });
}

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
