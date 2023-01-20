var express = require('express');
var router = express.Router();
var teamName = null;
var attemptQue = null;
var places = [];
var types = [];
var arr = [];
const mongoose = require('mongoose');
var mongodb = require('mongodb');
// mongoose.connect('mongodb+srv://manthan1:oIg1de2GCSCEMcQR@cluster0.ty2uj.mongodb.net/cyw?retryWrites=true&w=majority', {useNewUrlParser: true});
let connection = mongoose.connection;

var rooms = ['AV001','AV002','AV003','AV004','AV005','AV006','AV007','AV008','AV009','AV010','AV011','AV012','AV101','AV102','AV103','AV104','AV105','AV106','AV107','AV108','AV109','AV110','AV111','AV112'];
var corr = ['Type-1','Type-2','Type-3','Type-4','Type-5','Type-6','Type-7','Type-8','Type-9','Type-10'];

var user = {
    _id: null,
    team_name: teamName,
    correct: 0
};

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.team == null){
      var backup = req.cookies['team_name'];
      //this cookie saves my ass when some user has closed the browser and returns to the site
      if(backup){
          res.render('game.hbs', { output: backup });
      }
      else{
          res.render('index', { teamName: teamName });
      }
  }
  else{
      res.render('game.hbs', { output: req.session.team });
  }
});

router.post('/submit', function(req,res,next){
    teamName = req.body.team_name;
    var ObjectID = mongodb.ObjectID;
    //making user schema
        user._id = ObjectID;
        user.team_name = teamName;
        user.correct = 0;
    //end of user schema
    console.log(teamName);
    //checking if the team is already available then don't insert into database again of course team_name not being null
    connection.collection('user').findOne({team_name: teamName}, function(err, doc){
        console.log("doc is: "+doc);
        if(err){
            console.log(err);
        }
        if(doc == null && teamName != null){
            connection.collection('user').insert(user);
            console.log(teamName+ " is registered!");
            req.session.team = teamName;
            res.cookie("team_name", teamName, { maxAge: 900000, httpOnly: false}); //added a cookie for team_name just for having my back
            res.render('game.hbs', {output: teamName});
        }
        if(doc != null){
            console.log("I told you..."+teamName+ " is registered!");
            req.session.team = teamName;
            console.log("And the session var goes to..."+req.session.team);
            res.cookie("team_name", teamName, { maxAge: 900000, httpOnly: false});
            res.render('game.hbs', {output: teamName});
        }
    });

});

//when the user freaks out and posts a get request by pressing enter on the URL bar

router.get('/submit', function (req, res, next) {
    if(req.session.team){
        console.log("I told you..."+req.session.team+ " is registered!");
        res.render('game.hbs', {output: req.session.team}); //used session variable team for showing data back again
    }
    else{
        var backup = req.cookies['team_name'];
        if(backup){
            res.render('game.hbs', {output: backup});
        }
        else{
            req.cookie('team_name', null);
            res.render('index.hbs', {output: 'Life hai ab...kya kare?'});
        }
    }
});

var quizSchema = mongoose.Schema({
    no: Number,
    que: String,
    a: String,
    b: String,
    c: String,
    d: String,
    correct: String,
    code: Number,
    correctType: String,
    place: String
});

var Quiz = mongoose.model("Quiz", quizSchema, "cyw"); //model for the quiz module

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function generateZero(one, two){
    for(var j=1; j<=3; j++){
        var randomRoom = Math.floor(Math.random()*23) + 1;
        var randomType = Math.floor(Math.random()*9) + 1;
        places[j] = rooms[randomRoom];
        types[j] = corr[randomType];
        console.log(places[j]);
        console.log(types[j] + " at random no "+ randomType);
        if(places[j] == one){
            randomRoom = Math.floor(Math.random()*23) + 1;
            places[j] = rooms[randomRoom];
        }
        if(types[j] == two){
            randomType = Math.floor(Math.random()*9) + 1;
            types[j] = corr[randomType];
        }
    }
}
function generateOne(one, two){
    var randomRoom = Math.floor(Math.random()*23) + 1;
    var randomType = Math.floor(Math.random()*9) + 1;
    places[0] = rooms[randomRoom];
    types[0] = corr[randomType];
    if(places[0] == one){
        randomRoom = Math.floor(Math.random()*23) + 1;
        places[0] = rooms[randomRoom];
    }
    if(types[0] == two){
        randomType = Math.floor(Math.random()*9) + 1;
        types[0] = corr[randomType];
    }
    for(var j=2; j<=3; j++){
        randomRoom = Math.floor(Math.random()*23) + 1;
        randomType = Math.floor(Math.random()*9) + 1;
        places[j] = rooms[randomRoom];
        types[j] = corr[randomType];
        console.log(places[j]);
        console.log(types[j] + " at random no "+ randomType);
        if(places[j] == one){
            randomRoom = Math.floor(Math.random()*23) + 1;
            places[j] = rooms[randomRoom];
        }
        if(types[j] == two){
            randomType = Math.floor(Math.random()*9) + 1;
            types[j] = corr[randomType];
        }
    }
}

function generateTwo(one, two){
    var randomRoom = Math.floor(Math.random()*23) + 1;
    var randomType = Math.floor(Math.random()*9) + 1;
    places[3] = rooms[randomRoom];
    types[3] = corr[randomType];
    if(places[3] == one){
        randomRoom = Math.floor(Math.random()*23) + 1;
        places[3] = rooms[randomRoom];
    }
    if(types[3] == two){
        randomType = Math.floor(Math.random()*9) + 1;
        types[3] = corr[randomType];
    }
    for(var j=0; j<=1; j++){
        randomRoom = Math.floor(Math.random()*23) + 1;
        randomType = Math.floor(Math.random()*9) + 1;
        places[j] = rooms[randomRoom];
        types[j] = corr[randomType];
        console.log(places[j]);
        console.log(types[j] + " at random no "+ randomType);
        if(places[j] == one){
            randomRoom = Math.floor(Math.random()*23) + 1;
            places[j] = rooms[randomRoom];
        }
        if(types[j] == two){
            randomType = Math.floor(Math.random()*9) + 1;
            types[j] = corr[randomType];
        }
    }
}
function generateThree(one, two){
    for(var j=0; j<=2; j++){
        var randomRoom = Math.floor(Math.random()*23) + 1;
        var randomType = Math.floor(Math.random()*9) + 1;
        places[j] = rooms[randomRoom];
        types[j] = corr[randomType];
        console.log(places[j]);
        console.log(types[j] + " at random no "+ randomType);
        if(places[j] == one){
            randomRoom = Math.floor(Math.random()*23) + 1;
            places[j] = rooms[randomRoom];
        }
        if(types[j] == two){
            randomType = Math.floor(Math.random()*9) + 1;
            types[j] = corr[randomType];
        }
    }
}

router.all('/startGame', function(req, res, next){
    console.log("Start Game vala..."+req.session.team);
        if(req.session.lastQue == null || req.cookies["lastQue"] == null){
            Quiz.find({}, function (err, doc) {
                doc = shuffle(doc); //shuffled array
                for(var i=0;i<20;i++){
                    arr[i] = doc[i];
                }
                switch(arr[0].correct){
                    case 'A':
                        places[0] = arr[0].place;
                        types[0] = arr[0].correctType;
                        console.log(places[0] +" "+ types[0]);
                        generateZero(places[0], types[0]);
                        req.session.pB = places[1];
                        req.session.tB = types[1];
                        res.cookie('pB', places[1], { maxAge: 900000, httpOnly: false});
                        res.cookie('tB', types[1], { maxAge: 900000, httpOnly: false});
                        req.session.pC = places[2];
                        req.session.tC = types[2];
                        res.cookie('pC', places[2], { maxAge: 900000, httpOnly: false});
                        res.cookie('tC', types[2], { maxAge: 900000, httpOnly: false});
                        req.session.pD = places[3];
                        req.session.tD = types[3];
                        res.cookie('pD', places[3], { maxAge: 900000, httpOnly: false});
                        res.cookie('tD', types[3], { maxAge: 900000, httpOnly: false});
                        break;
                    case 'B':
                        places[1] = arr[0].place;
                        types[1] = arr[0].correctType;
                        generateOne(places[1], types[1]);
                        req.session.pA = places[0];
                        req.session.tA = types[0];
                        res.cookie('pA', places[0], { maxAge: 900000, httpOnly: false});
                        res.cookie('tA', types[0], { maxAge: 900000, httpOnly: false});
                        req.session.pC = places[2];
                        req.session.tC = types[2];
                        res.cookie('pC', places[2], { maxAge: 900000, httpOnly: false});
                        res.cookie('tC', types[2], { maxAge: 900000, httpOnly: false});
                        req.session.pD = places[3];
                        req.session.tD = types[3];
                        res.cookie('pD', places[3], { maxAge: 900000, httpOnly: false});
                        res.cookie('tD', types[3], { maxAge: 900000, httpOnly: false});
                        break;
                    case 'C':
                        places[2] = arr[0].place;
                        types[2] = arr[0].correctType;
                        generateTwo(places[2], types[2]);
                        req.session.pB = places[1];
                        req.session.tB = types[1];
                        res.cookie('pB', places[1], { maxAge: 900000, httpOnly: false});
                        res.cookie('tB', types[1], { maxAge: 900000, httpOnly: false});
                        req.session.pA = places[0];
                        req.session.tA = types[0];
                        res.cookie('pA', places[0], { maxAge: 900000, httpOnly: false});
                        res.cookie('tA', types[0], { maxAge: 900000, httpOnly: false});
                        req.session.pD = places[3];
                        req.session.tD = types[3];
                        res.cookie('pD', places[3], { maxAge: 900000, httpOnly: false});
                        res.cookie('tD', types[3], { maxAge: 900000, httpOnly: false});
                        break;
                    case 'D':
                        places[3] = arr[0].place;
                        types[3] = arr[0].correctType;
                        generateThree(places[3], types[3]);
                        req.session.pB = places[1];
                        req.session.tB = types[1];
                        res.cookie('pB', places[1], { maxAge: 900000, httpOnly: false});
                        res.cookie('tB', types[1], { maxAge: 900000, httpOnly: false});
                        req.session.pC = places[2];
                        req.session.tC = types[2];
                        res.cookie('pC', places[2], { maxAge: 900000, httpOnly: false});
                        res.cookie('tC', types[2], { maxAge: 900000, httpOnly: false});
                        req.session.pA = places[0];
                        req.session.tA = types[0];
                        res.cookie('pA', places[0], { maxAge: 900000, httpOnly: false});
                        res.cookie('tA', types[0], { maxAge: 900000, httpOnly: false});
                        break;
                    default: break;
                }
                res.render('quiz.hbs', {
                    no: arr[0].no,
                    que: arr[0].que,
                    a: arr[0].a,
                    b: arr[0].b,
                    c: arr[0].c,
                    d: arr[0].d,
                    pA: places[0],
                    tA: types[0],
                    pB: places[1],
                    tB: types[1],
                    pC: places[2],
                    tC: types[2],
                    pD: places[3],
                    tD: types[3],
                    correct: arr[0].correct,
                    code: arr[0].code,
                    place: arr[0].place,
                    userQue: 1
                });
                req.session.lastQue = 0;
                res.cookie('lastQue', 0);

                req.session.correct = arr[0].correct;
                req.session.code = arr[0].code;
                res.cookie('correct', arr[0].correct, { maxAge: 900000, httpOnly: false});
                res.cookie('code', arr[0].code, { maxAge: 900000, httpOnly: false});
            });
        }
        else{
            console.log("Mein else mein hu!!");
            var radio = req.body.answer;
            var qrcode = req.body.qrcode;
            var newQue;
            var value;
            console.log(radio +" "+qrcode);
            console.log(req.session.correct+" "+req.session.code);
            if(radio == req.session.correct && qrcode == req.session.code || radio == req.cookies["correct"] && qrcode == req.cookies["code"]) {
                console.log("Mein if k andar hu...");
                var backup = req.cookies["team_name"];
                newQue = parseInt(req.session.lastQue) + 1;
                console.log(typeof newQue);
                if (newQue == 21) {
                    res.render('winner.hbs', {
                        hero: "Hey, Congratulations! You were the best.",
                        thanks: "Thank You for playing ;)"
                    });
                }
                else {
                    console.log("Variable newQue stands for..." + newQue);
                    req.session.lastQue = newQue;
                    value = parseInt(req.cookies["lastQue"]) + 1;
                    res.cookie('lastQue', value, {maxAge: 900000, httpOnly: false});
                    console.log("lastQue cookie is..." + value);
                    console.log(newQue + " " + value);
                    console.log("Team session is " + req.session.team);
                    console.log("Backup se bachane vala hai..." + backup);
                    if (req.session.teamName == null) {
                        connection.collection("user").updateOne({team_name: backup}, {$inc: {correct: 1}});
                    }
                    else if (req.session.teamName != null) {
                        connection.collection("user").updateOne({team_name: req.session.team}, {$inc: {correct: 1}});
                    }
                    switch (arr[newQue].correct) {
                        case 'A':
                            places[0] = arr[newQue].place;
                            types[0] = arr[newQue].correctType;
                            console.log(places[0] + " " + types[0]);
                            generateZero(places[0], types[0]);
                            req.session.pB = places[1];
                            req.session.tB = types[1];
                            res.cookie('pB', places[1], {maxAge: 900000, httpOnly: false});
                            res.cookie('tB', types[1], {maxAge: 900000, httpOnly: false});
                            req.session.pC = places[2];
                            req.session.tC = types[2];
                            res.cookie('pC', places[2], {maxAge: 900000, httpOnly: false});
                            res.cookie('tC', types[2], {maxAge: 900000, httpOnly: false});
                            req.session.pD = places[3];
                            req.session.tD = types[3];
                            res.cookie('pD', places[3], {maxAge: 900000, httpOnly: false});
                            res.cookie('tD', types[3], {maxAge: 900000, httpOnly: false});
                            break;
                        case 'B':
                            places[1] = arr[newQue].place;
                            types[1] = arr[newQue].correctType;
                            generateOne(places[1], types[1]);
                            req.session.pA = places[0];
                            req.session.tA = types[0];
                            res.cookie('pA', places[0], {maxAge: 900000, httpOnly: false});
                            res.cookie('tA', types[0], {maxAge: 900000, httpOnly: false});
                            req.session.pC = places[2];
                            req.session.tC = types[2];
                            res.cookie('pC', places[2], {maxAge: 900000, httpOnly: false});
                            res.cookie('tC', types[2], {maxAge: 900000, httpOnly: false});
                            req.session.pD = places[3];
                            req.session.tD = types[3];
                            res.cookie('pD', places[3], {maxAge: 900000, httpOnly: false});
                            res.cookie('tD', types[3], {maxAge: 900000, httpOnly: false});
                            break;
                        case 'C':
                            places[2] = arr[newQue].place;
                            types[2] = arr[newQue].correctType;
                            generateTwo(places[2], types[2]);
                            req.session.pB = places[1];
                            req.session.tB = types[1];
                            res.cookie('pB', places[1], {maxAge: 900000, httpOnly: false});
                            res.cookie('tB', types[1], {maxAge: 900000, httpOnly: false});
                            req.session.pA = places[0];
                            req.session.tA = types[0];
                            res.cookie('pA', places[0], {maxAge: 900000, httpOnly: false});
                            res.cookie('tA', types[0], {maxAge: 900000, httpOnly: false});
                            req.session.pD = places[3];
                            req.session.tD = types[3];
                            res.cookie('pD', places[3], {maxAge: 900000, httpOnly: false});
                            res.cookie('tD', types[3], {maxAge: 900000, httpOnly: false});
                            break;
                        case 'D':
                            places[3] = arr[newQue].place;
                            types[3] = arr[newQue].correctType;
                            generateThree(places[3], types[3]);
                            req.session.pB = places[1];
                            req.session.tB = types[1];
                            res.cookie('pB', places[1], {maxAge: 900000, httpOnly: false});
                            res.cookie('tB', types[1], {maxAge: 900000, httpOnly: false});
                            req.session.pC = places[2];
                            req.session.tC = types[2];
                            res.cookie('pC', places[2], {maxAge: 900000, httpOnly: false});
                            res.cookie('tC', types[2], {maxAge: 900000, httpOnly: false});
                            req.session.pA = places[0];
                            req.session.tA = types[0];
                            res.cookie('pA', places[0], {maxAge: 900000, httpOnly: false});
                            res.cookie('tA', types[0], {maxAge: 900000, httpOnly: false});
                            break;
                        default:
                            break;
                    }
                    res.render('quiz.hbs', {
                        no: arr[newQue].no,
                        que: arr[newQue].que,
                        a: arr[newQue].a,
                        b: arr[newQue].b,
                        c: arr[newQue].c,
                        d: arr[newQue].d,
                        pA: places[0],
                        tA: types[0],
                        pB: places[1],
                        tB: types[1],
                        pC: places[2],
                        tC: types[2],
                        pD: places[3],
                        tD: types[3],
                        correct: arr[newQue].correct,
                        code: arr[newQue].code,
                        place: arr[newQue].place,
                        userQue: newQue+1
                    });
                    req.session.correct = arr[newQue].correct;
                    req.session.code = arr[newQue].code;
                    res.cookie('correct', arr[newQue].correct, { maxAge: 900000, httpOnly: false});
                    res.cookie('code', arr[newQue].code, { maxAge: 900000, httpOnly: false});
                }
            }
            else{
                if(req.session.lastQue == null){
                   lastQue =  req.cookies['lastQue'];
                }
                else{
                    var lastQue = req.session.lastQue;
                }
                console.log(arr);
                switch(arr[lastQue].correct){
                    case 'A':
                        req.session.pA = arr[lastQue].place;
                        req.session.tA = arr[lastQue].correctType;
                        break;
                    case 'B':
                        req.session.pB = arr[lastQue].place;
                        req.session.tB = arr[lastQue].correctType;
                        break;
                    case 'C':
                        req.session.pC = arr[lastQue].place;
                        req.session.tC = arr[lastQue].correctType;
                        break;
                    case 'D':
                        req.session.pD = arr[lastQue].place;
                        req.session.tD = arr[lastQue].correctType;
                        break;
                    default: break;
                }

                res.render('quiz.hbs', {
                    no: arr[lastQue].no,
                    que: arr[lastQue].que,
                    a: arr[lastQue].a,
                    b: arr[lastQue].b,
                    c: arr[lastQue].c,
                    d: arr[lastQue].d,
                    pA: req.session.pA,
                    tA: req.session.tA,
                    pB: req.session.pB,
                    tB: req.session.tB,
                    pC: req.session.pC,
                    tC: req.session.tC,
                    pD: req.session.pD,
                    tD: req.session.tD,
                    correct: arr[lastQue].correct,
                    code: arr[lastQue].code,
                    place: arr[lastQue].place,
                    wrong : 'Oh sorry! This is not the answer!',
                    userQue: lastQue+1
                });
                req.session.correct = arr[lastQue].correct;
                req.session.code = arr[lastQue].code;
                res.cookie('correct', arr[lastQue].correct, { maxAge: 900000, httpOnly: false});
                res.cookie('code', arr[lastQue].code, { maxAge: 900000, httpOnly: false});
            }
        }
});

module.exports = router;
