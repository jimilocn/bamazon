# Bamazon
NorthWestern University Coding Bootcamp "Bamazon" Assignment

## Overview
This program was created in the Northwestern University Coding Bootcamp 2019. It is a command line storefront for purchasing items on the customer side, and for managing inventory on the management side. This program challenges the user to accomplish different terminal based commands using Node JS. This program uses MySQL for dynamic data CRUD operations.

### Link to the video demo of the app
*  https://youtu.be/TNq7NT4ZN6w


## Bamazon Customer Functions

Customers are able to access all items within the store inventory and request a purchase. If the item has enough in stock, then the store will display the amount that the customer owes. If there is no enough in stock, the customer is promted to look at another item or buy a smaller amount. 

## Bamazon Manager Functions

- View Products for sale 
- View Low Inventory
- Update Inventory Quantity
- Add New Product
- Log out

#### View Products for sale
* This function will pull all information from MySQL for the store's item inventory. This will pull and display item name, item price, department that the item is in, and how much stock there is of the item. The table is made more visually appealing with console.table. The manager is prompted to sign out or go back to the main menu.

#### View Low Inventory
* This function will filter out all items from the MySQL database with inventory less than 10 and display those items. The table is made more visually appealing with console.table. The manager is prompted to sign out or go back to the main menu.

#### Update Inventory Quantity
*This will allow the manager to redefine the amount of stock each item has. The function is able to search for the seed of data from MySQL and update the particular stock quantity based on the manager's item id input. The function will then show the new quantity and prompt the manager to log out or go back to the menu.

#### Add New Product
* This function will look at the manager's request to add a new item, and if the item already exists, there will be a message telling the manager that. If there is no item like that already in the database, the price, department, name, and quantity will all be inserted into the MySQL database. The manager will then be prompted to log out or go back to the main menu


## Technologies used in this project

- javascript
- jQuery
- Node JS
- JSON
- npm inquirer
- npm console.table
- MySQL




