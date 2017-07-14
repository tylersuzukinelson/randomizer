const db = require('./../db');

module.exports = {
  // Helper function to insert input to the Database
  // STRETCH-4 - Store the history of all the user submissions in a Postgres database
  insert: function(names, method, num){
    db.query(`INSERT INTO history (names, method, number) VALUES ($1, $2, $3)`, [names, method, num]);
  },
  // Helper function to generate an array of teams- if `number-per-team` is selected
  // STRETCH-3 - Support for selecting number-per-team
  numberPerTeam: function(num, namesArr){
    let result = [];
    let spliced = ``;
    for(let counter = 0; 0 < namesArr.length; counter++){
      result[counter] = ``; // Initialize all indexes
      for(let j = 0; j < num; j++){
         spliced = namesArr.splice(Math.floor(Math.random()*namesArr.length), 1).join();
         result[counter] += spliced + '\n'
      }
     }
     return result;
  },
  // Helper function to generate an array of teams - if `team-count` is selected
  // STRETCH-3 - Support for selecting team-count
  teamCount: function(num, namesArr){
    let result = [];
    let spliced = ``;
    // Initialize all indexes of 'result' to an empty string
    for(x = 0; x < num; x++){
      result[x] = ``;
    }
    let index = 0;
    while(namesArr.length > 0){
      spliced = namesArr.splice(Math.floor(Math.random()*namesArr.length), 1).join();
      result[index] += spliced + `\n`;
      index = (index == num-1)? 0 : (index + 1);
    }
    return result;
  }
};
