const app = require('./app');
const config = require('./config/config');

//Init Mongo
require('./config/db');

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`\🚀 Server is listening on ${PORT}`);
});
