const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genres");
const schema = new mongoose.Schema({
  name: String,
  genres: {
    type:[genreSchema],
    validate:{
      validator:function(obj){
        // console.log(obj.length)
        return obj.length>0
      },
      message:'Invalid as number of genres is not positive'
    }
  },
  dailyRentalRate:{
    type:Number,
    required:true,
    min:0,
    max:50
  },
  numberInStock:{
    type:Number,
    required:true,
    min:0,
    max:50
  }
});
const Movie = mongoose.model("Movie", schema);

function validateMovie(movie) {
  const schema = {
    name: Joi.string().min(3).max(255).required(),
    numberInStock:Joi.number().min(0).max(50).required(),
    dailyRentalRate:Joi.number().min(0).max(100).required(),
    genres:Joi.array()

  };
  return Joi.validate(movie, schema);
}
exports.validate = validateMovie;
exports.Movie = Movie;
