const { json } = require("body-parser");

fetch(
    'http://localhost:3002/todos', 
    {method:'GET'}).
    then((response) =>
    response.json().
    then((jsonBody) => 
        console.log(jsonBody))
    );