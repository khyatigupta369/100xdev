const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// function middleware1(req, res, next){
//     next();
// }

// app.use(middleware1);
app.use(bodyParser.json());

function countNumbers(counter){
    var sum = 0
    for(var i = 0; i <= counter; i++){
        sum += i;
    }
    return sum;
}

function mulNumbers(counter){
    var product = 1
    for(var i = 1; i <= counter; i++){
        product *= i;
    }
    return product;
}



app.get('/calC', (req, res) => {

    var counter = req.query.counter;
    // var counter = req.headers.counter;
    // var counter = req.body.counter;

    var calculatedSum = countNumbers(counter)
    
    var answerObject = {
        sum : calculatedSum,
        mul : mulNumbers(counter)
    }

    res.status(200).send(answerObject);
});

function givePage(req, res){
    res.send(`
    <head>
        <title>
            Hello from index.html
        </title>
    </head>
    <body>
        <i>I am doin a course rn</i>
    </body>`)
}

app.get('/', givePage);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
