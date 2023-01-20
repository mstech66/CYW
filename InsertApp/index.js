var f = 'data.json';
var express = require('express');
const fs = require('fs');
const bodyParser = require("body-parser");
const app = express()
var no = 1;
var room = new Array('AV001','AV002','AV003','AV004','AV005','AV006','AV007','AV008','AV009','AV010','AV011','AV012','AV101','AV102','AV103','AV104','AV105','AV106','AV107','AV108','AV109','AV110','AV111','AV112');
var types = new Array('Type-1','Type-2','Type-3','Type-4','Type-5','Type-6','Type-7','Type-8','Type-9','Type-10');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(3000, function(){
    console.log("Server running on port 3000");
});

app.post("/submit", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    next();
    var que = req.body.que;
    console.log(que);
    var opt_a = req.body.opt_a;
    console.log(opt_a);
    var opt_b = req.body.opt_b;
    console.log(opt_b);
    var opt_c = req.body.opt_c;
    console.log(opt_c);
    var opt_d = req.body.opt_d;
    console.log(opt_d);
    var correct = req.body.correct;
    console.log(correct);
    var code = Math.floor(Math.random() * 90000) + 10000;
    console.log(code);
    var selected_room =  Math.floor(Math.random() * room.length);
    var selType = Math.floor(Math.random() * types.length);
    console.log(room[selected_room]);
    
    var data = {
        no : no,
        que : que,
        a: opt_a,
        b: opt_b,
        c: opt_c,
        d: opt_d,
        correct: correct,
        code: code,
        correctType: types[selType],
        place: room[selected_room]
    };
    
    var ans = JSON.stringify(data) + '\n'; //Creating JSON file for MongoDB Database
    no++;

    fs.appendFileSync('data.json', ans, function(err){
        if(err) throw err;
        console.log("Successfully Appended Data!")
    });

    var qr = code + ' - ' + types[selType] + ' - ' + room[selected_room] + `
    `; //adding seperate QR Codes txt file for QR Code Generator

    var qr1 = code + `
    `;

    fs.appendFileSync('qrcodes.txt', qr, function(err){
        if(err) throw err;
        console.log("Successfully Appended Data!")
    });

    fs.appendFileSync('qr.txt', qr1, function(err){
        if(err) throw err;
        console.log("Successfully Appended Data!")
    });
});