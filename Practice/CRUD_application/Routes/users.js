const express = require('express');
// import express from 'express'
// import {v4 as uuid4} from 'uuid';
const {v4 : uuid4} = require('uuid');

const router = express.Router();

//mock dp 
var users = [
      {
            first_name:"John",
            Last_name : "doe",
            email : "john@doe.com"
      },
      {
            first_name:"Alice",
            Last_name:"Smith",
            email:"Alice@smith.com"
      }
]

// get request: get all users
router.get('/' , (req,res)=>{
      res.send(users);
})

//post request : create a user
router.post('/',(req,res) => {
      const user = req.body;
      console.log({user}) // getting the user from the req body
      users.push({...user , id :uuid4()}) // pushing the new user into the new user
      res.send(`${user.first_name} has been added to the database`);
})

// get a perticular used with ID
router.get('/:id' , (req,res)=>{
      const {id} = req.params;
      const foundUser = users.find((user)=>user.id === id);
      res.send(foundUser);
})

// delete request

router.delete('/:id' , (req,res)=>{
      const {id} = req.params;
      users = users.filter((user) => user.id !== id);
      res.send(`${id} deleted successfully `);
})

// patch / update the user with perticulat ID
router.patch('/:id' , (req,res)=>{
      const {id} = req.params;
      const {first_name , last_name , email} = req.body;
      const user = users.find((user) => user.id === id);
      if(first_name) user.first_name = first_name;
      if(last_name) user.Last_name = last_name;
      if(email) user.email = email;
      res.send(`${user.first_name} and with ID ${id} have been updated successfully`)
})

module.exports=router;