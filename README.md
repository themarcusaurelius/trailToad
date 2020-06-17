## Deploying your first Fullstack e-commerce site with BigCommerce. 

<p align="center">
    <img src="https://imgur.com/3qS6LaF.png">
</p>

Today, having a modern and attractive website is at the forefront of any business. BigCommerce is revolutionizing the way retailers can run their online shopping experiences to allow for more provoking user interactions full of rich and engaging content. With Bigcommerce, owners are now able to launch a full product line in minutes and can make timely updates to any aspect of their e-commerce site without delay.

But did you know that BigCommerce also provides a powerful API to help you jumpstart your own custom online shop quickly? You can build out your 100% taylor-made site using the tech-stacks of your choosing and easily tap into BigCommerce’s resources to bring everything to life.

So, how does one go about getting a custom e-commerce shop setup and where to even begin with all of this? Luckily, for you, this tutorial will guide you through the step-by-step process from creating your BigCommerce account to deploying your custom online shop all the while learning a few tricks and new technologies along the way.

[Demo](https://trailtoad.herokuapp.com)

#### Technologies Used:
- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [BigCommerce API](https://developer.bigcommerce.com/api-docs)
- [BigCommerce ‘Buy Now’ Buttons](https://www.bigcommerce.com/apps/buy-buttons/)
- [Axios](https://www.npmjs.com/package/axios)
- [Fetch](https://javascript.info/fetch)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [MDB Bootstrap](https://mdbootstrap.com/)
- [Heroku](https://www.heroku.com/)
- [Asynchronous Programming](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [React HTML Parser](https://www.npmjs.com/package/react-html-parser)
- [GitHub](https://github.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Postman](https://www.postman.com/)
- [Git Bash](https://git-scm.com/downloads)

#### Prerequisites 
[Node.js](https://nodejs.org/en/), [Postman](https://www.postman.com/), and [Git Bash](https://git-scm.com/downloads) must already be installed as well as having a [GitHub](https://github.com/) and [Heroku](https://www.heroku.com/) account to deploy the source code. We will also be using [Visual Studio Code](https://code.visualstudio.com/) as the code editor but feel free to use whichever editor you are most comfortable with. Use the links provided above for any installations or account creations.

### 1. Create a BigCommerce account

The first step is creating an account. For this, we will be using the free 15 day trial account. Create your account by going to the following link: 

https://www.bigcommerce.com/essentials 

Click on the free trial button and follow the steps for onboarding. Once your Store is created you will then be redirected to your online dashboard. 

<p align="center">
    <img src="https://imgur.com/qerhOac.png">
</p>

### 2. Add a product.

Once in our dashboard, we need to add a product to the store. To do this, click on the <b>Products</b> tab on the left hand menu and then click on <b>Add</b>. Fill out the required information of any product you would like to add. At a minimum, will need to at least add details regarding Product Name, Brand, Pricing, Product Description, and an Image. Once all the details have been added, click <b>Save</b>.

<p align="center">
    <img src="https://imgur.com/1Z7wAGm.png">
</p>

### 3. Create BigCommerce API credentials.

Now we need to generate our custom API credentials to allow us to interact with the BigCommerce Platform. Click on <b>Advanced Settings</b> on the left hand menu then <b>API Accounts</b>. You can then click on <b>Create API Account</b> and choose <b>Create V2/V3 API Token</b> to get started. Give your API a name and for the purpose of this demo we will need OAuth scope of <b>Products</b> to <b>read-only</b> though you change any other scope as well depending on how you wish the use the API. Once finished, click <b>Save</b> and your API credentials will be displayed as well as downloaded to your local machine. Don’t lose these!

<p align="center">
    <img src="https://imgur.com/o3aBXL5.png">
</p>

### 4. Check that the API is working.

Check that the API is working. Will be using [Postman](https://www.postman.com/) for this. Postman is a collaboration platform for API development. Postman's features simplify each step of building an API and streamline collaboration so you can create better APIs—faster. In Postman, use the <b>API Path</b> from your credentials followed by the path <b>/catalog/products</b>

Ex: https://api.bigcommerce.com/stores/b7sed14fe5/v3/catalog/products

In the <b>Headers</b> section add the following keys with their values from your credentials:

```
   Key:				    Value:
	X-Auth-Token			{ Insert CLIENT ID here}
	X-Auth-Client			{ Insert CLIENT SECRET here}

```
Press send and you should then see a json file of the products displayed:

<p align="center">
    <img src="https://imgur.com/bKcjDAx.png">
</p>

### 5. Set up the Express.js server in Node.js.

We can now begin working on our own custom website. First, we will need to get the server up and running. To begin, create a folder called <b>BigCommerce</b> and then open the folder in Visual Studio Code. Once in VSCode, create a file called <b>package.json</b> in the <b>Bigcommerce</b> folder and add the following code: 

```json
{
  "name": "bigcommece",
  "version": "1.0.0",
  "description": "Demo App For BIGCOMMERCE",
  "main": "server.js",
  "engines": {
    "node": "14.2.0"
  },
  "scripts": {
    "start": "node server",
    "server": "nodemon server",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "agentkeepalive": "^4.0.2",
    "axios": "^0.19.0",
    "concurrently": "^4.1.2",
    "cors": "^2.8.5",
    "dotenv": "^8.1.0",
    "express": "^4.17.1",
    "express-form-data": "^2.0.10",
    "get-json": "^1.0.1",
    "node-fetch": "^2.6.0",
    "nodemon": "^1.19.2"
  }
}
```
Once the file is created, in the terminal run the following command:
```
npm install
```
This will download and install all the dependencies listed above needed to run our application successfully in the server.

Next, we need to create the Express.js server. In the root directory, create a file called <b>server.js</b> and add the following code:

```javascript
// Dependencies
const express = require('express');
const formData = require('express-form-data');
const path = require('path');
  
//Import Routes Here
const store = require('./routes/api/store');
  
const app = express(); 
  
// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(formData.parse());
 
//Define Routes
app.use('/api/data', store);
  
//Serve Static assets in production
//Configuration for Express to behave correctly in production environment
if (process.env.NODE_ENV === 'production') {
    //First - Making sure express will serve production assets - main.js, main.css, etc
    app.use(express.static('client/build'));
    //Second -Express will serve up the index.html file if it doesn't recognize the route
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
};
 
const PORT = process.env.PORT || 5000;
 
app.listen(PORT, () => console.group(`Server Started On ${PORT}`));
```

We will be importing our API routes from a separate location so we will need to create a folder called <b>routes</b> with a subfolder called <b>api</b>. Inside the <b>api</b> folder, create a file called <b>routes.js</b> and add the following code:

```javascript
const express = require('express');
const router = express.Router();
const axios = require('axios');
 
router.get('/product', (req,res) => {
	res.json(‘Route is working!’)
});
 
module.exports = router;
```

Now that the API routes have been added, in the terminal, run the following command:

```
npm run server
```
This will start the server. You will then see the following message if everything worked correctly. We are using the package [Nodemon](https://www.npmjs.com/package/nodemon) to automatically restart the node application when file changes in the directory are detected.

<p align="center">
    <img src="https://imgur.com/JHCytj6.png">
</p>

