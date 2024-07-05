const app = require('./app');
const findFreePort = require('find-free-port');

findFreePort(3001, 3100, (err, freePort) => {
  if (err) {
    console.error('Error finding free port', err);
    process.exit(1);
  }

  const PORT = freePort || process.env.PORT;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
