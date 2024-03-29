const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let movieSchema = mongoose.Schema({
  Image: { type: String, required: true },
  Title: { type: String, required: true },
  Year: { type: String, required: true },
  Genre: [{
    Name: String,
    Description: String
  }],
  Description: { type: String, required: true },
  Directors: {
    Name: String,
    Birthday: String,
    Bio: String
  },
});

let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  ToWatch: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }]
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

module.exports.Movie = Movie;
module.exports.User = User;