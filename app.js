//required npm packages
var mysql = require('mysql');
require("dotenv").config();
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

menuStart();

function menuStart() {
    inquirer.prompt([

        // Here we give the user a list to choose from.
        {
            type: "list",
            message: "what do you want to do?",
            choices: ["Products for Sale", "exit"],
            name: "op",
        },

        // Here we ask the user to confirm.
        {
            type: "confirm",
            message: "Are you sure:",
            name: "confirm",
            default: false
        }
    ]).then(function (inquirerSearch) {
        if (inquirerSearch.confirm != false) {
            switch (inquirerSearch.op) {
                case "Products for Sale":
                    // song();
                    buy_item()
                    break;

                case "exit":
                    console.log("Bye!");
                    return 0;


                default:
                    break;
            }
        } else {
            menuStart();
        }
    });

}



function confirmContinue() {

    inquirer.prompt([

        {
            type: "confirm",
            message: "Continue?:",
            name: "confirm",
            default: false
        }
    ]).then(function (confirmContinue) {
        if (confirmContinue.confirm != false) {
            menuStart();
        } else {
            return 0;
        }
    });

}




function buy_item() {
    // query the database for all items being sold
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) console.log(err);

        inquirer
            .prompt([{
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArr = [];
                        for (var i = 0; i < results.length; i++) {
                            if (results[i].stock_quantity == 0) {
                                choiceArr.push(results[i].product_name + " $" + results[i].price + ": out of stock sorry :(");

                            } else {
                                choiceArr.push(results[i].product_name + " $" + results[i].price + ": available quantity: " + results[i].stock_quantity);
                            }
                        }
                        
                        return choiceArr;
                    },
                    message: "What would like to buy?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "how many would you like to buy?"
                }
            ])
            .then(function (answer) {
                var name_of_item = answer.choice.split(' ');


                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === name_of_item[0]) {
                        chosenItem = results[i];

                    }
                }
                if ((chosenItem.stock_quantity >= answer.quantity) && !(answer.quantity <= -1)) {
                    var stocks = (chosenItem.stock_quantity - answer.quantity);

                    //if quantity was too high let the user know and start over
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [{
                                stock_quantity: stocks
                            },
                            {
                                id: chosenItem.id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("purchase successfully made!");
                            console.log("your purchase was :$" + (chosenItem.price * answer.quantity));
                            confirmContinue()
                        }
                    );
                } else {
                    console.log("Insufficient quantity!");
                    buy_item();
                }

            });
    });
}