## Overview
This API performs basic CRUD operation of an e-commerce store web-application which includes :

Create user, products, orders, and cart  
Read user, products, orders, and cart  
Update user, products, orders, and cart  
Delete user, products, orders, and cart  
This API also implements Authentication and Authorization of users and admin.

Try it out
For a demo check this link https://chiadi-ecommerce-api.herokuapp.com

Getting Started
These instructions will get a copy of the project up and running on your machine for development.

# Requirements
To run this project locally, the following tools needs to be installed

Node.js
MongoDB
Installation
Clone this repository

git clone https://github.com/Chiadikaobixo/Node-Ecommerce-API.git

Move into the project directory and install its dependencies

npm install

To start the dev API server run this command

npm run dev

Navigate to localhost:3000 to see the API

Documentation
Setting up Config
Navigate to dev.env file and set up the missing environment variables which includes

PORT : this is optional or you can set it to 3000
MONGO_URL : use your local MongoDb url which should like this mongodb://localhost:27017/**Database_name**
SECRET_KEY : this could be any value e.g "onlineStore"
JWT_SECRET_KEY :  this could be any value e.g "onlineStorejwt"
Registration
Since this API makes use of Authentication, you need to be a registered user before you make CRUD operations to the API

# create user
Make a post request to :   
/users/signup
Input the following data:  
name  
email  
password 


# Login user  
Make a post request to :  
/users/login
Input the following data:  
email  
password  
A JWT TOKEN will be provided for you in the response. Intially, the API will save the JWT TOKEN in the cookies so you do not have to set it again in the frontend

# Read user
Make a get request to:  
/users/:userId  

# Read All users
Make a get request to:  
/users  

# Update user
Make a get request to:  
/users/:userId 
Input the following data:  
name(optional)  
email(optional)  
password(optional)  

# delete user
Make a delete request to :  
/users/:userId     


# Create order
Make a post request to :  
/orders   
Input the following data:  
userId  
products [  
    productId:  
]  
amount  
address  


# Read All orders
Make a get request to:  
/orders  

# Read A single order 
Make a get request to:  
/orders/:userId    

# Update order  
Make a patch request to :  
/orders/:orderId  
Input the following data:  
amount(optional)  
address(optional)  

# Delete order
Make a delete request to :  
/orders/:orderId  

# Create product
Make a post request to :  
/products    
Input the following data:  
title
description
categories
image
price
color
size 


# Read All products
Make a get request to:  
/products  

# Read A single product
Make a get request to:  
/products/:productId    

# Update product  
Make a patch request to :  
/products/:productId  
Input the following data:  
title
description
categories
image
price
color
size 

# Delete product
Make a delete request to :  
/products/:productId  

# Create cart
Make a post request to :  
/carts    
Input the following data:  
userId  
products [  
    productId:  
]  


# Read All carts
Make a get request to:  
/carts  

# Read A single cart
Make a get request to:  
carts/:userId 

# Update cart
Make a patch request to :  
/carts/:cartId  
Input the following data:  
userId  
products [{  
    productId: 
}, {
    quantity:
}]  


# Delete cart
Make a delete request to :  
/carts/:cartId