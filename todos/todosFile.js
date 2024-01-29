const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const fs = require('fs')

// middleware
app.use(bodyParser.json())

function removeAtIndex(array, index){
    var newArray = [];
    for(var i = 0; i < array.size(); i++){
        if(!index) newArray.push(array[i]);
    }
    return newArray;
}

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/todos', (req, res) =>{
    // read from file
    fs.readFile("todos.json", 'utf-8', (err, data) => {
        if (err) throw err
        res.status(200).json(JSON.parse(data))
    });
});


app.delete('/todos/:id', (req, res) =>{

    fs.readFile('todos.json', 'utf-8', (err, data) => {
        if (err) throw err 
        const todos = JSON.parse(data);
        
        const todoIndex = todos.findIndex((i) =>  i.id === parseInt(req.params.id))
        if(todoIndex === -1){
            res.status(400).send();
        }
        else {
            todos = removeAtIndex(todos, todoIndex)
        }

        // write to file
        fs.writeFile('todos.json', JSON.stringify(todos), (err) => {
            if (err) throw err;
            res.status(200).send("Deleted")
        });
        });

})

app.post('/todos', (req, res) =>{

    fs.readFile('todos.json', 'utf-8', (err, data) => {
        if (err) throw err 
        const todos = JSON.parse(data);

        const newTodo = {
            id : Math.floor(Math.random() * 10000),
            title: req.body.title,
            description : req.body.description
        }

        todos.push(newTodo)

        // write to file
        fs.writeFile('todos.json', JSON.stringify(todos), (err) => {
            if (err) throw err
            res.status(201).json(newTodo);
        });

        })

})

port = 3004

app.listen(port, ()=>{
    console.log('Listening at port ' + port)
});