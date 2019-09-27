var mysql = require('mysql');
let inquirer = require("inquirer");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  port     : "3306",
  password : 'Blitzcrank13',
  database : 'dungeons_db'
});
 

 
connection.connect(function (err, res) {
  if (err) throw err;
  askName();
});

function askName() {
    inquirer
    .prompt([{ 
            name: "playername",
            type: "input",
            message: "What is your name?"
            
        }])
        .then(function(answer){
            let query = "SELECT player FROM playerinfo WHERE ?";
            connection.query(query, {player: answer.player}, function(err,res) {
                if (err) throw err;
                for (let i = 0; i < res.length; i++) {
                    console.log("Name: " + res[i].player);
                }
                
            });
        });
    }
        
        
        
        
        
        /*{
            name: "charactername",
            message: "What is your character's full name?",
            type: "input"

        }, 
        {
            name: "class",
            message: "Please select the class of your character.",
            type: "list",
            choices: [ "Barbarian", "Bard", "Blood Hunter", "Blood Mage", "Chef", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard" ]        
        },
        {
            name: "race",
            message: "What class is your character?",
            type: "list",
            choices: ["Dwarf", "Goblin", "Halfing", "Human", "Minotaur", "Orc", "Tiefling", "Troll", "Vampire"]

        }
    ]);  console.log("Hello " + user.name);

   



 




*/