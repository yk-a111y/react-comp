const express = require('express');
const path = require('path');

const app = express();
const port = 9002;

app.get('/api/test.txt', (req, res) => {
  res.set('x-page-version', Math.ceil(Date.now() / 5000));
  res.send('Hello, World!');
});

// 创建启动服务器的函数
const startServer = (port) => {
  app.listen(port)
    .on('listening', () => {
      console.log(`Server started successfully at http://localhost:${port}`);
    })
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is busy, trying ${port + 1}...`);
        startServer(port + 1);
      } else {
        console.error('Server error:', err);
      }
    });
};

// 启动服务器
startServer(port);