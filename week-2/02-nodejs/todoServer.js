/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(bodyParser.json());

function getIndex(todos, id) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == id) {
      return i;
    }
  }
  return -1;
}

function removeIndex(arr,index){
  let newTodo=[];
  for(let i=0;i<arr.length;i++){
    if(i!==index){
      newTodo.push(arr[i]);
    }
  }
  return newTodo;
}

app.get("/todos", (req, res) => {
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) {
      res.status(404).send("Todos not found");
    }
    const todos=JSON.parse(data);
    res.status(200).json(todos);
  });
});

app.get("/todos/:id", (req, res) => {
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) {
      res.status(404).send("Todos not found");
    }
    const id = req.params.id;
    const todos = JSON.parse(data);
    const todoIndex = getIndex(todos, parseInt(id));

    if (todoIndex == -1) {
      res.status(404).send();
    } else {
      res.status(200).json(todos[todoIndex]);
    }
  });
});

// 3. POST /todos - Create a new todo item
//     Description: Creates a new todo item.
//     Request Body: JSON object representing the todo item.
//     Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
//     Example: POST http://localhost:3000/todos
//     Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
app.post("/todos", (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 1000000),
    title: req.body.title,
    completed: req.body.completed,
    description: req.body.description,
  };
  fs.readFile('todos.json','utf-8',(err,data)=>{
    if(err) throw err;
    const todos=JSON.parse(data);
    todos.push(newTodo);
    fs.writeFile("todos.json",JSON.stringify(todos),(err)=>{
      if (err) throw err;
      res.status(201).json(newTodo);
    })
  })
});

app.put('/todos/:id',(req,res)=>{
  fs.readFile('todos.json','utf-8',(err,data)=>{
    if(err) throw err;
    const id=req.params.id;
    const todos=JSON.parse(data);
    const todoIndex=getIndex(todos,parseInt(id));
    if(todoIndex==-1){
      res.status(404).send();
    }else{
      todos[todoIndex].title=req.body.title;
      todos[todoIndex].completed=req.body.completed;
    }
    fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.status(200).send();
    });
  })
})

// 5. DELETE /todos/:id - Delete a todo item by ID
// Description: Deletes a todo item identified by its ID.
// Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
// Example: DELETE http://localhost:3000/todos/123

app.delete('/todos/:id',(req,res)=>{
  fs.readFile('todos.json','utf-8',(err,data)=>{
    if(err) throw err;
    let todos=JSON.parse(data);
    const todoIndex=getIndex(todos,parseInt(req.params.id));
    if(todoIndex==-1){
      req.status(404).send();
    }else{
      todos=removeIndex(todos,todoIndex);
      fs.writeFile('todos.json',JSON.stringify(todos),(err)=>{
        if(err) throw err;
        res.status(200).send();
      })
    }
  })
})

// for all other routes, return 404
app.use((req, res, next) => {
  res.status(404).send();
});

module.exports = app;