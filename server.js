'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = process.env.PORT || 4000;


let inputs = [];

const { stock, customers } = require('./data/promo');



let response = {
    'status': 'success | error',
    'error': '450 | 550 | 650 | 000'
}


//handlers


const handleTodoPage = (req, res) => {
    res.render("pages/todos", {
        inputs: inputs

    })
}

const handleInput = (req, res) => {
    const { input } = req.body;
    if (input != "") {
        inputs.push(input);
    };
    // console.log(inputs);

    res.redirect("/");

}

const handleDelete = (req, res) => {
    let deletedItem = req.params.item;
    inputs = inputs.filter(function (input) {
        return input !== deletedItem;
    });
    res.render("pages/todos", {
        inputs: inputs
    })


}


//#2

let userInput = {};


const handleOrder = (req, res) => {
    let status;

    // user input
    let address = req.body.address;
    let country = req.body.country;
    let province = req.body.province;
    let givenName = req.body.givenName;
    let surname = req.body.surname;
    let item = req.body.order;
    let shirtSize = req.body.size;


    //order Object (GLOBAL)

    userInput.item = item;
    userInput.givenName = givenName;
    userInput.surname = surname;
    userInput.address = address;
    userInput.country = country;
    userInput.province = province;
    userInput.shirtSize = shirtSize;

    // Stock
    let socks = stock.socks;
    let bottles = stock.bottles;
    let smShirts = stock.shirt.small
    let mdShirts = stock.shirt.medium
    let lgShirts = stock.shirt.medium


    customers.forEach(customer => {
        if (customer.givenName === givenName || customer.address === address) {
            status = 505;
        } else {
            status = 400;
        }
    })

    if (country !== "Canada") {
        status = 650;
    } else if (shirtSize === "medium" && mdShirts === "0"
        || item === "socks" && socks === "0"
        || item === "bottles" && bottles === "0"
    ) {
        status = 450;
    }

    if (item === "undefined" || shirtSize === "undefined" && item === "shirt") {
        status = "000"
    }

    if (status === 505) {
        return res.json({ 'status': 'error', 'error': '550' });
    } else if (status === 450) {
        return res.json({ 'status': 'error', 'error': '450' });
    } else if (status === 650) {
        return res.json({ 'status': 'error', 'error': '650' });
    } else if (status === "000") {
        return res.json({ 'status': 'error', 'error': '000' });
    } else {
        return res.json({ 'status': 'success' });

    }


}

const handleSuccess = (req, res) => {
    res.render("pages/order-confirmation", {
        userInput: userInput
    });
}



express()
    .use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
    .use(morgan('tiny'))
    .use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({ extended: false }))
    .set('view engine', 'ejs')

    // endpoints

    // Exercise 1
    .get("/", handleTodoPage)
    .post("/data", handleInput)
    .get("/delete:item", handleDelete)


    //exercise 2 
    .post("/order", handleOrder)
    .get('/order-confirmed', handleSuccess)


    .get('*', (req, res) => res.send('Dang. 404.'))
    .listen(PORT, () => console.log(`Listening on port ${PORT}`));