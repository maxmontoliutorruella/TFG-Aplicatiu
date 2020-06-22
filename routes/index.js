var express = require('express');
const fs = require("fs"); 
// import request module
var request = require('request');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Introdueix la descripció!', condition: true, anyArray: [1,2,3] });
});

router.get("/results",function(req, res,next){
  request('https://raw.githubusercontent.com/maxmontoliutorruella/server/master/sample.json',function(err,response,body){
    console.log('error',err)
    console.log('statusCode:', response && response.statusCode)
    var parsedBody = JSON.parse(body)
   // res.send(parsedBody[0])
   console.log('Get del server',parsedBody.data)

   
   //Escrivint al json
    fs.writeFile("./public/d.json", JSON.stringify(parsedBody.data), err => { 
     
      // Checking for errors 
      if (err) throw err;  
    
      console.log("Done writing"); // Success 
    }); 
   res.render('tree')
  });
});

router.get('/test/:id', function(req, res, next) {
  console.log(req.params)
  res.render('test', {output: req.params.id});
});

router.post('/test/submit', function(req, res, next) {
  res.contentType('application/json');
  var content = req.body.content
  console.log('text',content)
  var limit =  10 
  var some_input = {'data':{'content':content, 'limit': limit}}
  var some_inputJSON = JSON.stringify(some_input);
  // aquí hauriem de fer el SEND
  console.log('Tinc el body:',some_inputJSON)
  //res.redirect('/test/'+ '10');
  res.send(some_inputJSON)
});


module.exports = router;