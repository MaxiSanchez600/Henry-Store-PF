const { conn } = require('./src/db.js');
const server = require('./src/app.js')
const {PORT} =  require('./src/utils/config/index.js');

// Syncing all the models at once.
conn.sync({ force: false })
.then(() => {
  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`); // eslint-disable-line no-console
  });
});

