const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const { doesNotReject } = require('assert');
const dotenv = require('dotenv');

//load env vars
dotenv.config({ path: './config/config.env' });

//load the models
const Bootcamp = require('./models/Bootcamps');

//connect to the db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//read json file
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`)
);

//import into db
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log('Data imported'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

//delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log('Data deleted'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
