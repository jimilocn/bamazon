var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "jimilocn",
    password: "Cheese1!",
    database: "bamazonDB"
});


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");



    function startMenu() {
        console.log("\n Main Menu for the Manager! \n")
        inquirer.prompt([{
            type: "list",
            message: "Here is the list of approved tasks for you.",
            choices: ["View Products for sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Log out"],
            name: "managerChoice"
        }]).then(function (res) {
            switch (res.managerChoice) {
                case "View Products for sale":
                    displayInventory();
                    break;
                case "View Low Inventory":
                    lowInventory();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                    // case "Add New Product":
                    //     addNewInventory();
                    //     break;
                case "Log out":
                    console.log("OK! See you soon! Don't be late to your next shift!")
                    connection.end();
                    break;

            }


        })
    }



    function displayInventory() {

        connection.query("SELECT * FROM products", function (err, res) {

            if (err) throw err;
            console.log("\n" + "These are the items currently available: \n");
            for (var i = 0; i < res.length; i++) {
                console.log("Item Id: " + res[i].item_id + "\n",
                    "Product name: " + res[i].product_name + "\n",
                    "Department: " + res[i].department_name + "\n",
                    "Price ($): " + res[i].price + "\n",
                    "Quantity left in stock: " + res[i].stock_quantity + "\n",
                    "-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- \n"
                )
            }
            returnToMenu();
        });



    }

    function lowInventory() {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            console.log("\n\n" + "These are the items currently with stock quantity less than 10: \n");

            for (var i = 0; i < res.length; i++) {
                if (res[i].stock_quantity < 10) {
                    console.log("Item Id: " + res[i].item_id + "\n",
                        "Product name: " + res[i].product_name + "\n",
                        "Department: " + res[i].department_name + "\n",
                        "Price ($): " + res[i].price + "\n",
                        "Quantity left in stock: " + res[i].stock_quantity + "\n",
                        "-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- \n"
                    )
                }
            }

            returnToMenu();
        })

    }

    function returnToMenu() {
        inquirer.prompt([{
            type: "list",
            message: "Do you want to return to the main menu?",
            choices: ["Yes! Bring me back to the main menu", "No. Log me out"],
            name: "managerMenuChoice"
        }]).then(function (res) {
            switch (res.managerMenuChoice) {
                case "Yes! Bring me back to the main menu":
                    startMenu();
                    break;
                case "No. Log me out":
                    console.log("\n\n See you soon! Don't forget to submit the timesheets!")
                    connection.end();
            };
        });
    }

    function addInventory() {
        inquirer.prompt([{
            type: "input",
            message: "What is the item ID number that you want to add to?",
            name: "item_id",
            validate: function (value) {
                if (isNaN(value)) {
                    return false;
                } else {
                    return true;
                }
            }
        }, {
            type: "input",
            message: "What is the quantity of this item that you would like to have in stock?",
            name: "quantity",
            validate: function (value) {
                if (isNaN(value)) {
                    return false;
                } else {
                    return true;
                }
            }
        }]).then(function (update) {
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [{
                        stock_quantity: update.quantity
                    },
                    {
                        item_id: update.item_id
                    }
                ],
                function (err) {
                    if (err) throw err;

                    console.log(product_name + " has been updated!!\n")
                    ;
                    console.log("New quantity is ", stock_quantity);
                    returnToMenu();

                })
        })

    }
    startMenu();
});




// function addNewInventory(){

// }