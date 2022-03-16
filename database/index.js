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
    hungerhearts: 0,
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

module.exports = {
  addPet: addPet,
  getStats: getStats,
  checkIfExists: checkIfExists,
};
