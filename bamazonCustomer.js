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
    displayInventory();
});

function displayInventory() {
    console.log("these are the items currently available: \n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item Id: " + res[i].item_id + "\n",
                "Product: " + res[i].product_name + "\n",
                "Department: " + res[i].department_name + "\n",
                "Price: " + res[i].price + "\n",
                "Quantity left in stock: " + res[i].stock_quantity + "\n",
                "-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- \n"
            )
        }
        whatToBuy();
        // console.log(res);
    })
   
}

function whatToBuy() {
    console.log("What do you want to buy today? \n");
    inquirer.prompt([{
            type: "input",
            message: "What is the item ID that you want to purchase",
            name: "itemId",
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
    ]).then(function(res){
        if (res.stock_quantity>= res.quantity){
            console.log("this is: ",res.stock_quantity);
            console.log("this is: ",res.quantity);
            console.log("There are enough for you to purchase? \n");
            // updateQuantity();
        }
        else{
            console.log("Insufficient quantity!");
        }
    })
};