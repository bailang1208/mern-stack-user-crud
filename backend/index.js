const config = require('./src/config/config');
const app = require('./src/app');

app.listen(config.port, () => {
  console.log(`MERN stack backend is running on port ${config.port}.`);
});