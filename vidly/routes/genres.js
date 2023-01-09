const router = require("express").Router();
const {Genre,validate}=require('../models/genres')
router.get("/", async (req, res) => {
    
  return res.send(await Genre.find());
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("Genre not found");
  return res.send(genre);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);
  const genre = new Genre({
    name: req.body.name,
  });
  await genre.save();
  res.send(genre);
});
router.put("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("Genre not found");

  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);
  genre.set({ name: req.body.name });
  await genre.save();
  res.send(genre);
});
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("Genre not found");
  await Genre.deleteOne({ _id: req.params.id });
  res.send(genre);
});

exports.genreRouter=router