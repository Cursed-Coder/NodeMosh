const express = require("express");
const router = express.Router();
const { Movie, validate } = require("../models/movies");
const {Genre}=require("../models/genres")
router.get("/", async (req, res) => {
  const movies = await Movie.find({});
  return res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send("Cant find movie");
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    console.log("Hello");
    return res.status(400).send(error.details[0].message);
  }
  const genres = [];
  // console.log(req.body.genres)
  for (idx in req.body.genres) {
    const genreId=req.body.genres[idx]
    // console.log("Here")
    // console.log(req.body.genres[genreId])
    const tempGenre = await Genre.findById(genreId);
    if (!tempGenre)
      return res.status(404).send(`Genre with id ${genreId} not found`);
    const genre = new Genre({
      _id: tempGenre._id,
      name: tempGenre.name,
    });
    genres.push(genre);
  }
  const movie = Movie({
    name: req.body.name,
    genres: genres,
    numberInStock:req.body.numberInStock,
    dailyRentalRate:req.body.dailyRentalRate
  });
  const err=[]
  try{
   const result= await movie.save();
   res.send(result)
  }
  catch(ex){
    for(field in ex.errors){
      err.push(ex.errors[field].message)
      // console.log(ex.errors[field].message)

    }
  }
  res.send(err)

});

router.put("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    return res.status(404).send("Movie not found with given id");
  }
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  movie.set({ name: req.body.name });
  await movie.save();
  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    return res.status(404).send("Movie not found with given id");
  }
  movie = await Movie.deleteOne({ _id: id });
  res.send(movie);
});
exports.router = router;
