const express = require('express');
const router = express.Router();
const db = require('../db');
const MAX_AGE = 1000*60*60*24;

router.get('/', function(req, res){
  const {result} = req.cookies;
  res.render('index', {result:result, err: '', names: '', method: '', number: ''});
});

router.post('/', function(req, res){
  const {names, method, number} = req.body;
  //STRETCH-1 - Validate user input
  req.checkBody('number', 'Invalid number').isInt();
  req.checkBody('names', 'Names can not be empty').notEmpty();
  let errors = req.validationErrors();

  //If errors exist render index and send the errors as `err`
  let err = [];
  if(errors){
    errors.forEach(function(errObj){
      err.push(errObj.msg + `\n`);
    });
    res.render('index', {result:'', err: err, names: names, method: method, number: number});
  }
  // If error doesnt exist, then generate the result
  else {
    let namesArr = names.split(`,`).map(function(x){
      return x.trim();
    });
    let num = parseInt(number.trim());
    const tools = require('./../helpers/tools');
    // Calling a function to insert history into our db '(names, method, num)' will be inserted into table 'history';
    // STRETCH-4 - Store the history of all the user submissions in a Postgres database
    tools.insert(names, method, num);
    // STRETCH-3 - Support for selecting team-count
    let result = (method == 'number-per-team')? tools.numberPerTeam(num, namesArr) : tools.teamCount(num, namesArr);
    // STRETCH-2 - Store the array of team members in a session
    // so previous result can be displayed when page is revisited
    res.cookie('result', result, {maxAge: MAX_AGE});
    res.render('index', {result: result, err: '', names: '', method: '', number: ''});
  }
});


module.exports = router;
