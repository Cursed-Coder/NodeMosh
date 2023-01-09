const express=require('express')
const app=express();
const {router}=require("./routes/movies")
const mongoose = require("mongoose");
const {genreRouter}=require('./routes/genres')
mongoose.connect("mongodb://localhost:27017/playground").then(()=>console.log("Connected to MongoDB...")).catch(err=>console.log(err))
app.use(express.json());
app.use('/movies',router)
app.use('/genres',genreRouter)
const PORT=process.env.PORT||3000
app.listen(3000,()=>console.log(`Listening on port ${PORT}`))