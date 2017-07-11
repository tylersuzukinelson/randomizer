const express = require('express');
const router = express.Router();
//const db = require('../db');

function numberPerTeam(num, namesArr){
  let result = ` `;
  for(let counter = 1; 0 < namesArr.length; counter++){
    result += `<div id="auto-res"><h3>${counter}</h3>`;

    for(let j = 1; j <= num; j++){
       result += namesArr.splice(Math.floor(Math.random()*namesArr.length), 1).join() + `<br>`;
    }
    result += `</div>`;
   }
   return result;
}

function teamCount(num, namesArr){
  let resultArr = [];
  //initialize the divs with id='auto-res' and h3
  for(x = 1; x <= num; x++){
    resultArr.push(`<div id="auto-res"><h3>${x}</h3>`);
  }
  //fill up random name selections
  let index = 0;
  while(namesArr.length > 0){
    resultArr[index] += namesArr.splice(Math.floor(Math.random()*namesArr.length), 1).join() + `<br>`;
    index = (index == num-1)? 0 : (index + 1);
  }
  //close all div tags
  for(x = 0; x < num; x++){
    resultArr[x] += `</div>`
  }
  return resultArr.join('');
}

router.get('/', function(req, res){
  res.render('index', {result:""});
});

router.post('/', function(req, res){
  const {names, method, number} = req.body;
  let namesArr = names.split(',').map(function(x){
    return x.trim();
  });
  let num = parseInt(number.trim());

  let result = (method == "number-per-team")? numberPerTeam(num, namesArr) : teamCount(num, namesArr);

  res.render('index', {result: result});
});


module.exports = router
