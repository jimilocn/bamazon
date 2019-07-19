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



    function startMenu() {
        console.log("\n Main Menu for the Manager! \n")
        inquirer.prompt([{
            type: "list",
            message: "Here is the list of approved tasks for you.",
            choices: ["View Products for sale", "View Low Inventory", "Update Inventory Quantity", "Add New Product", "Log out"],
            name: "managerChoice"
        }]).then(function (res) {
            switch (res.managerChoice) {
                case "View Products for sale":
                    displayInventory();
                    break;
                case "View Low Inventory":
                    lowInventory();
                    break;
                case "Update Inventory Quantity":
                    updateInventory();
                    break;
                case "Add New Product":
                    addNewItem();
                    break;
                case "Log out":
                    console.log("OK! See you soon! Don't be late to your next shift!")
                    console.log("\n\n log in again by entering 'node bamazonManager.js' in your command line!")
                    connection.end();
                    break;

            }


        })
    }



    function displayInventory() {

        connection.query("SELECT * FROM products", function (err, res) {

            if (err) throw err;
            console.log("\n" + "These are the items currently available: \n");
            console.table(res);
            returnToMenu();
        });



    }

    function lowInventory() {
        connection.query("SELECT * FROM products WHERE stock_quantity <10", function (err, res) {
            if (err) throw err;
            if (res) {
                console.log("There are currently no items below the 10 item minimum threshold!");
                returnToMenu();
            }
            else {

                console.log("\n\n" + "These are the items currently with stock quantity less than 10: \n");

                console.table(res);
                returnToMenu();
            }

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

    function updateInventory() {
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
                    connection.query(
                        "SELECT * FROM products WHERE?", {
                            item_id: update.item_id
                        },
                        function (err, res) {
                            if (err) throw err;
                            console.log("\n" + res[0].product_name + " has been updated!!\n");
                            console.log("New quantity is ", res[0].stock_quantity, "\n");
                            returnToMenu();
                        }
                    )


                })
        })

    }

    function addNewItem() {
        inquirer.prompt([{
            type: "input",
            message: "What is the name of the new item that you want to add to the inventory?",
            name: "new_name"
        }, {
            type: "input",
            message: "How much does this product cost?",
            name: "new_price",
            validate: function (value) {
                if (isNaN(value)) {
                    return false;
                } else {
                    return true;
                }
            }
        }, {
            type: "input",
            message: "What department will this new item live?",
            name: "new_department"
        }, {
            type: "input",
            message: "How much of this item do you want to keep in stock?",
            name: "new_stock",
            validate: function (value) {
                if (isNaN(value)) {
                    return false;
                } else {
                    return true;
                }
            }
        }]).then(function (new_item) {
            connection.query("SELECT * FROM products WHERE ?", {
                product_name: new_item.new_name
            }, function (err, res) {
                if (err) throw err;
                if (res[0].product_name != new_item.new_name) {
                    connection.query("insert into products set ?", [{
                        product_name: new_item.new_name,
                        department_name: new_item.new_department,
                        price: new_item.new_price,
                        stock_quantity: new_item.new_stock
                    }], function (err) {
                        if (err) throw err
                        console.log("\n\n New item as been added! \n")
                        console.log("\n New item: ", new_item.new_name, "\n",
                            "Price: $", new_item.new_price, "\n",
                            "Item's Department: ", new_item.new_department, "\n",
                            "Stock of new item: ", new_item.new_stock, "\n\n")
                        returnToMenu();
                    })
                } else {
                    console.log("\n\n This item already exists! \n\n");
                    returnToMenu();
                }
            })
        })




    }
    startMenu();
});