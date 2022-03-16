const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pets');

let petSchema = mongoose.Schema({
  user: String,
  name: String,
  age: Number,
  weight: Number,
  hungerhearts: Number,
  timesFed: Number,
});

let Pet = mongoose.model('Pet', petSchema);

let addPet = (newUserObj) => {
  let pet = new Pet({
    user: newUserObj.user,
    name: newUserObj.name,
    age: 0,
    weight: 0.5,
    hungerhearts: 5,
    timesFed: 0,
  });
  return pet.save();
};

let getStats = (user) => {
  return Pet.find({ user: user });
};

let checkIfExists = (user, callback) => {
  Pet.find({ user: user }).count(callback);
};

const updateFeedings = (user, callback) => {
  //if hungerhearts is less than 5, return this, else return a version without incrementing da hearts
  Pet.findOneAndUpdate(
    { user: user },
    { $inc: { timesFed: 1, hungerhearts: 1 } }
  ).exec(callback);
};

const removeHearts = (user, callback) => {
  Pet.findOneAndUpdate(
    { user: user },
    { $inc: { hungerhearts: -1 } },
    callback
  );
  //Pet.findOneAndUpdate({ user: user }, { hungerhearts: 5 }).exec(callback);
};

module.exports = {
  addPet: addPet,
  getStats: getStats,
  checkIfExists: checkIfExists,
  updateFeedings: updateFeedings,
  removeHearts: removeHearts,
};
