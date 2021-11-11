const mongoose = require('mongoose');

mongoose
  .connect(process.env.REACT_APP_MONGODB_URI || 'mongodb://localhost/google-books-search-engine', {
    // Options to deal with deprecation warnings.
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

module.exports = mongoose.connection;
