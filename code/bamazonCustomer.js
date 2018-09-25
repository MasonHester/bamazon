//bamazonCustomer.js

//npm Linking
const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table")

//database connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

//Used for displaying any array passed into it
const create_table = (products) => {
    const table = new Table({
        head: ['ID', 'Product', 'Department', 'Price', 'Quantity'],
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
               , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
               , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
    });

    products.forEach((element) =>{
        table.push(
            [element.item_id, element.product_name, element.department_name, element.price, element.product_quantity]
        );
    });

    console.log(table.toString());
}

const process_purchase = (itemID, price, inStock, amountBought) => {
    const finalPrice = amountBought * price;
    console.log(`Your final price is ${finalPrice.toFixed(2)}`);
    connection.query("UPDATE products SET ? WHERE ?", [
        {product_quantity: inStock - amountBought},
        {item_id: itemID}
    ], (err, res) => {
        if(err) throw err;
        console.log(`${res.affectedRows} rows updated`);
        choose_action();
    })

    
}

const choose_amount = (itemID, price, inStock) => {
    inquirer.prompt({
        type: "input",
        name: "itemAmount",        
        message: "Please enter how many you would like to purchase",
    }).then((answer) => {
        switch(true) {
            case (answer.itemAmount <= inStock):
                process_purchase(itemID, price, inStock, answer.itemAmount);
                break;
            case (answer.itemAmount > inStock):
                console.log("There arent that many items in stock!");
                choose_amount(itemID, price, inStock);
                break;
            default:
                console.log("Your purchase could not be completed");
                choose_action();
        }
    })
}

const choose_item = () => {
    inquirer.prompt({
        type: "input",
        name: "itemID",
        message: "Please enter the ID of the item you want to buy",
    }).then((answer) => {
        console.log(answer.itemID);
        connection.query("SELECT * FROM products WHERE ?", {item_id: answer.itemID}, (err, res) => {
            if(err) throw err;
            create_table(res);
            choose_amount(answer.itemID, res[0].price, res[0].product_quantity)
        })
    });
}

const display_items = () => {
    connection.query('SELECT * FROM products', (err, res) => {
        if(err) throw err;
        create_table(res);
        choose_action();
    })
}

const choose_action = () => {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Get a list of all items",
            "Buy an item by ID",
            "Exit application"
        ]
    }).then((answer) => {
        switch(answer.action) {
            case "Get a list of all items":
                display_items();
                break;
            case "Buy an item by ID":
                choose_item();
                break;
            case "Exit application":
                console.log('goodbye');
                connection.end();
                break;
            default:
                console.log("error in choose_action switch");
                choose_action();                
        }
    })
}

choose_action();