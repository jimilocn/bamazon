var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

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
    displayInventory();
});

function displayInventory() {
    console.log("Hello! Welcome to Bamazon! \n")
    console.log("These are the items currently available: \n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        whatToBuy();
        // console.log(res);
    })

}

function whatToBuy() {
    inquirer.prompt([{
        type: "list",
        message: "Would you like to purchase anything tody?",
        choices: ["Yes! I see something that I want", "No thank you. I do not see anything that I want"],
        name: "userPick"
    }]).then(function (res) {
        switch (res.userPick) {
            case "Yes! I see something that I want":
                purchase();
                break;
            case "No thank you. I do not see anything that I want":
                console.log("Not a problem! See again soon!");
                connection.end();
                break;

        }
    })

}

function purchase() {
    inquirer.prompt([{
            type: "input",
            message: "What is the item ID that you want to purchase",
            name: "item_id",
            validate: function (value) {
                if (isNaN(value)) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            message: "What is the quanity of that item that you want to buy?",
            name: "quantity",
            validate: function (value) {
                if (isNaN(value)) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    ]).then(function (buy) {
        connection.query("SELECT * FROM products WHERE ?", {
            item_id: buy.item_id
        }, function (err, res) {
            if (err) throw err;
            if (buy.item_id > 0) {
                if (res[0].stock_quantity >= buy.quantity) {

                    console.log("\n There are enough of this item in stock for you to purchase! \n",
                        "You owe $", (res[0].price * buy.quantity));

                    function updateQuantity() {
                        var newQuantity = (res[0].stock_quantity - buy.quantity)
                        connection.query("UPDATE products SET ? WHERE ?", [{
                                stock_quantity: newQuantity
                            },
                            {
                                item_id: buy.item_id
                            }
                        ], function (err) {
                            if (err) throw err;

                            console.log("After your purchase there are ", newQuantity, " stock left of ", res[0].product_name, "\n")
                            console.log("Thank you for yuor purchase! come back soon! \n")
                            console.log("Please enter 'node bamazonCustomer.js' to begin a new transaction!");
                            connection.end();
                        })
                    }
                    updateQuantity();
                } else {
                    console.log("Insufficient quantity! Let's look at a different item or a smaller quantity!");
                    console.log("Please enter 'node bamazonCustomer.js' to begin a new transaction!");
                    connection.end();
                }
            } else {
                console.log("Please enter avalid item number from the items listed above");
                console.log("Please enter 'node bamazonCustomer.js' to begin a new transaction!");
                connection.end();
            }
        })
    })
}