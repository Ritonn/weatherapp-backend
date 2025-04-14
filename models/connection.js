const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://admin:admin@monsupercluster.8hvhf4w.mongodb.net/weatherapp';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
