var sendObject = {
    method: "GET"
};

function logBody(jsonBody){
    console.log(jsonBody);
}

function callBackFnc(result){
    result.json().then(logBody);
};

fetch("http://localhost:3000/calC?counter=4", sendObject).then(callBackFnc);