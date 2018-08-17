## Introduction

XStore's backend, an exammple of a virtual store, that uses many modules for it, examples:

-- Uses Express to manage the http requests and responses
-- Mongoose for connecting to the MongoDB
-- Joi for Validating
-- jswonwebtoken for Auth

Above are the main modules.

This is the implementation of XStore in Node.js.

## Setup

Please follow the next steps.

### Install MongoDB

First you should have installed MongoDB, install it and make sure it is running.

### Install the Dependencies

When done, install the dependencies, there are some dependencies for automated tested that are not requires since I remove that part, I was doing some test on how to do it (Jest as example).

    npm i

### Populate the Database

There is a seed file to populate initial catalogs for Categories and Products tables. For Users: there is an option in the frontend system to register Users, if you want access to CRUD operations for products, please add a new field in the user created. Name it 'isAdmin' and set it to true. Otherwise if you are not a register user you will be able just to see the products inventory. Now if you are a register user, you can "Buy" the products.

    node seed.js (populate DB)

### Start the Server

To start reciving requests and send responses, run the following command:

    node index.js

To check if everything is running in the database, go to the following link:

    http://localhost:3900/api/products

You will be able to see all the list of products in the database.

### (Optional) Environment Variables

To make the implementation easy for this project at config/default.json, there is a property named jwtPrivateKey. This key is used to encrypt the web tokens. so this should not go to git, For a real scenario, this should be stored in an environment variable.
