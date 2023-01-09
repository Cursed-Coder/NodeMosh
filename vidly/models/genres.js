const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  name: String,
});
const Genre = mongoose.model("Genre", schema);

function validateGenre(genre) {
  const schema = {
    name: Joi.string().required(),
  };
  return Joi.validate(genre, schema);
}
exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema=schema
