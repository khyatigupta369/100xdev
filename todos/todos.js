const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const path = require('path')

// middleware
app.use(bodyParser.json())

const todos = [];

function removeAtIndex(array, index){
    const newArray = [];
    for(i = 0; i < array.size(); i++){
        if(!index) newArray.push(array[i]);
    }
    return newArray;
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/todos.html'));
});

app.get('/todos', (req, res) =>{
    res.status(200).json(todos);
})

app.get('/todos/:id', (req, res) =>{
    const todoIndex = todos.findIndex((i) =>  i.id === parseInt(req.params.id))

    if(todoIndex === -1){
        res.status(400).send();
    }
    else {
        res.status(202).json(todos[todoIndex]);
    }
})

app.delete('/todos/:id', (req, res) =>{
    const todoIndex = todos.findIndex((i) =>  i.id === parseInt(req.params.id))
    if(todoIndex === -1){
        res.status(400).send();
    }
    else {
        todos = removeAtIndex(todos, todoIndex)
        res.status(205).json(todos);
    }
})

app.post('/todos', (req, res) =>{

    const newTodo = {
        id : Math.floor(Math.random() * 10000),
        title: req.body.title,
        description : req.body.description
    }

    todos.push(newTodo)

    res.status(201).send(newTodo);


})

app.listen(3002, ()=>{
    console.log('Listening at port 3002')
});