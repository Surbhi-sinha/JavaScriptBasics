// import express from 'express';
const express = require('express');
const path = require('path')
// import bodyParser from 'body-parser'; // Used for making the unique ID for the users
const bodyParser = require('body-parser');
// import userRoutes from './Routes/users.js'; // Used
const userRoutes = require('./Routes/users.js');

const app = express(); // this os our app or ainstance of Express
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/user' , userRoutes);

app.get('/' , (req, res) => {
      const file = path.resolve(__dirname+"/index.html")
      res.sendFile(file)
      // res.send("hello from homepage");
})


// this is basically to listen on Port
app.listen(PORT , ()=>console.log(`Server running on port: //http://localhost:${PORT} `));