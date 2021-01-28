const mongoose = require('mongoose');
const config = require('./config');

const DB_HOST = config.MONGO_URI;
mongoose.set('useCreateIndex', true);

module.exports = (async () => {
  try {
    await mongoose.connect(DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      // debug: true,
    });
    // listen for requests
    console.log(`MongoDB Conected to ${DB_HOST}`);
  } catch (error) {
    console.log(`${error} Could not Connect to the Database. Exiting Now...`);
    process.exit();
  }
})();
