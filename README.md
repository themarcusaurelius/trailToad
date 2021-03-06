## Deploying Your First E-Commerce Site With BigCommerce. 

By: [Mark Mayfield](https://marksreactportfolio.herokuapp.com/)

<p align="center">
    <img src="https://imgur.com/3qS6LaF.png">
</p>

In today's world, having a modern and attractive e-commerce site is at the forefront of any successful business. [BigCommerce](https://www.bigcommerce.com) is revolutionizing the way retailers can run their online shopping experiences to allow for more provoking user interactions full of rich and engaging content. With BigCommerce, owners are able to launch a full product line in minutes and can make timely updates to any aspect of their e-commerce site without delay.

But did you know that BigCommerce also provides a powerful API to help you jumpstart your own custom online shop quickly? In fact, more than 90% of the BigCommerce platform data is exposed to the API and it supports over 400 calls per second! That makes it possible to perform 24,000 production updates in under a minute! Just build out a custom site using the tech-stacks of your choosing and easily tap into BigCommerce’s resources to bring everything to life.

So, how does one go about getting a custom e-commerce shop setup with BigCommerce and where to even begin with all of this? Luckily, for you, this demo will guide you through the step-by-step process from creating your BigCommerce account to deploying your very own custom product page. 

### Purpose of this demo:
- View a custom product page generated from the BigCommerce API.
- Add the product to a shopping cart and redirect users to the checkout page.

[Check Out The Live Demo Here!](https://trailtoad.herokuapp.com)

### Application Flow:

<p align="center">
    <img src="https://imgur.com/W30elK0.png">
</p>

### Sample Of Technologies Used:
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

### Prerequisites:
[Node.js](https://nodejs.org/en/), [Postman](https://www.postman.com/), and [Git Bash](https://git-scm.com/downloads) must already be installed as well as having a [GitHub](https://github.com/) and [Heroku](https://www.heroku.com/) account to deploy the source code. We will also be using [Visual Studio Code](https://code.visualstudio.com/) as the code editor but feel free to use whichever editor you are most comfortable with. Use the links provided above for any installations or account creations.

<hr>

Let's get started!

### 1. Create a BigCommerce account.

The first step is creating an account. For this, we will be using the free 15 day trial account. Create your account by going to the following link: 

[https://www.bigcommerce.com/essentials ](https://www.bigcommerce.com/essentials )

Click on the free trial button and follow the steps for onboarding. Once your Store is created you will then be redirected to your online dashboard. 

<p align="center">
    <img src="https://imgur.com/qerhOac.png">
</p>

<br>

### 2. Add a product.

Once in our dashboard, we need to add a product to the store. To do this, click on the <b>Products</b> tab on the left hand menu and then click on <b>Add</b>. Fill out the required information of any product you would like to add. At a minimum, we will need to at least add details regarding <b>Product Name, Brand, Pricing, Product Description, and an Image</b>. Once all the details have been added, click <b>Save</b>.

<p align="center">
    <img src="https://imgur.com/1Z7wAGm.png">
</p>

<br>

### 3. Create BigCommerce API credentials.

Now we need to generate our custom API credentials to allow us to interact with the BigCommerce Platform. Click on <b>Advanced Settings</b> on the left hand menu then <b>API Accounts</b>. You can then click on <b>Create API Account</b> and choose <b>Create V2/V3 API Token</b> to get started. Give your API a name. For the purpose of this demo we will need OAuth scope of <b>Products</b> to <b>read-only</b> though you change any other scope as well depending on how you wish to use the API. Once finished, click <b>Save</b> and your API credentials will be displayed as well as downloaded to your local machine. Don’t lose these!

<p align="center">
    <img src="https://imgur.com/o3aBXL5.png">
</p>

<br>

### 4. Check that the API is working.

Check that the API is working. Will be using [Postman](https://www.postman.com/) for this. Postman is a collaboration platform for API development. In Postman, use the <b>API Path</b> from your credentials followed by the path <b>/catalog/products</b>

Ex: [https://api.bigcommerce.com/stores/b7sed14fe5/v3/catalog/products](https://api.bigcommerce.com/stores/b7sed14fe5/v3/catalog/products)

In the <b>Headers</b> section add the following keys with their values from your credentials:

```
   Key:				    Value:
	X-Auth-Token			{ Insert CLIENT ID here}
	X-Auth-Client			{ Insert CLIENT SECRET here}

```
Press send and you should then see a JSON file of the products displayed:

<p align="center">
    <img src="https://imgur.com/bKcjDAx.png">
</p>

<br>

### 5. Set up the Express.js back-end server in Node.js.

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
    "nodemon": "^1.19.2"
  }
}
```
Once the file is created, in the terminal run the following command:
```
npm install
```
This will download and install all the dependencies listed above needed to run our application successfully in the server.

Next, we need to create the <b>Express.js</b> server. In the root directory, create a file called <b>server.js</b> and add the following code:

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

As you can see, we will be importing our API routes from a separate location so we will need to create a folder called <b>routes</b> with a subfolder called <b>api</b>. Inside the <b>api</b> folder, create a file called <b>routes.js</b> and add the following code:

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

<br>

### 6. Test the new custom route.

In Postman, we can now test our custom route with the following path:

[http://localhost:5000/api/data/product](http://localhost:5000/api/data/product)

<p align="center">
    <img src="https://imgur.com/clR0m6M.png">
</p>

It's working!

<br>

### 7. Secure and store the BigCommerce API Credentials.

In the root directory of our folder, create a <b>.env</b> file. We will use this to securely store our API credentials.  This will be very important when we push our code up to a public repository. The <b>.env</b> file should look like this:
	
```css
STORE=INSERT-STORE-CREDENTIAL-HERE
TOKEN=INSERT-ACCESS-TOKEN-HERE
CLIENT=INSERT-CLIENT-SECRET-HERE
```

<br>

### 8. Connect the back-end server to the BigCommerce API.

We now need to connect our server to the BigCommerce API. To do that, replace the code in <b>routes.js</b> with: 

```javascript
require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
 
const STORE = process.env.STORE
const TOKEN = process.env.TOKEN
const SECRET = process.env.SECRET
const URL = `https://api.bigcommerce.com/stores/${STORE}/v3/catalog/products?include=primary_image`
 
router.get('/product', async (req,res) => {
    try {
        const PRODUCT = await axios.get(`${URL}`, {
            headers: {
                'Content-Type': [
                    'application/json',  
                    'charset=utf-8' 
                ],
                'X-Auth-Token': `${TOKEN}`,
                'X-Auth-Client': `${SECRET}`
            }
        })
 
        res.json({ data: PRODUCT.data })
    } catch (err) {
        console.log(err)
    }
});
 
module.exports = router;
```

The code above is doing several things. It is pulling in the credentials from our <b>.env</b> and inserting them into the data using a method known as [Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). We will be using [Axios](https://www.npmjs.com/package/axios) here to make an [Asynchronous](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await) API call inside of a [Try...Catch Block](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) to our BigCommerce API. The function is requesting the data from our BigCommerce products catalog. We are using the Try...Catch block in case of any errors that will then be displayed in the console. The API call will then return the data as JSON.

To test that the route is working and that data is being received, we can use Postman to make an API call to the same route as before:

[http://localhost:5000/api/data/product](http://localhost:5000/api/data/product)

This should then display the JSON data from BigCommerce:

<p align="center">
    <img src="https://imgur.com/IBph9qs.png">
</p>

<br>

### 9. Creating the React Front-End.

Now that our back-end server is set up we can focus on the front-end view of the demo. We will be using <b>React.js</b> for this. To get started with React, in the root directory of the project, run the command in the terminal:

```
npx create-react-app client
```

This will create our <b>React.js</b> application in a folder called <b>client</b>. This could take awhile so this might be a good time to take a break and stretch your legs. Once everything has been installed, we need to replace the code in the newly added <b>client/package.json</b> with the following JSON:

```json
"name": "client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.5.0",
    "@testing-library/user-event": "^7.2.1",
    "concurrently": "^5.0.0",
    "mdbreact": "^4.27.0",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-html-parser": "^2.0.2",
    "react-scripts": "3.4.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "proxy": "http://localhost:5000",
 }
```

In the <b>client</b> folder, run the command 

```
npm install
```
This will install all the dependencies necessary on the front-end. Once done, you can then run:

```
npm start
```
This will launch the react app.

<p align="center">
    <img src="https://imgur.com/ZjQhnux.png">
</p>


<br>

### 10. Run the front-end and back-end together.

We can now run the front-end and back-end simultaneously. We are using an NPM package called <b>concurrently</b> to do this. We have also added the back-end path: http://localhost:5000 to our front-end as a proxy in the <b>client/package.json</b> in order to allow communication between both servers. In the root directory run the following command:

```
npm run dev
```

This will run <b>Express.js</b> server and <b>React.js</b> server at the same time.

<p align="center">
    <img src="https://imgur.com/VBWOpCw.png">
</p>

Congratulations! Your front-end and back-end are running and working together!



<br>

### 11. Pull in the BigCommerce data from the Express.js back-end and display it in React.js.


Now that we have the front-end and back-end running simultaneously, we need to pull in data from the back-end and display it on the front-end. To do that, replace the code in the <b>/client/src/app.js</b> with the following:

```javascript
import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Spinner from './components/Spinner/Spinner'
import { MDBBtn, MDBCard, MDBCardImage, MDBCol } from "mdbreact";
import './App.css';
 
const App = () => {
  const [data, setData] = useState([]);
 
  async function fetchProduct() {
    const product = await fetch("api/data/product", { method: 'GET' })
    product
      .json()
      .then(res => setData(res.data))
  };
 
  useEffect(() => {
    fetchProduct()
  }, []);
 
  return (
    <div>
      {data.data ?
        <div className="container">
          <MDBCol style={{ maxWidth: "75rem" }}>
            <div className="top-row">
              <MDBCol style={{ maxWidth: "22rem" }}>
                <MDBCard title="S-Works Stumpjumper 29">
                  <MDBCardImage 
                    className="img-fluid" 
                    id="image" 
                    src={data.data[0].primary_image.url_standard} 
                    waves 
 
                  />
                </MDBCard>
              </MDBCol>
              <div className="details">
                <h4><b>{data.data[0].name}</b></h4>
                <div>Specialized</div>
                <br/>
                <h5><b>${data.data[0].price}</b></h5>
                <MDBBtn 
                  gradient="aqua" 
                  id="button" 
                  style={{ width: "8rem" }}
                  onClick={buyProduct}
                  href="https://trailtoad.mybigcommerce.com/cart.php?action=buy&sku=SKU-112&source=buy_button"
                >
                  Buy Now
                </MDBBtn>
              </div>
            </div>  
            <div className="description">
              <h5><b>Description:</b></h5>
              {ReactHtmlParser(data.data[0].description)}
            </div>
          </MDBCol>
        </div>
        : <div className="spinner">
            <Spinner/>
          </div>
        }
    </div>
    
  );
}
 
export default App;
```

Let's add some custom CSS. Replace the code in our <b>App.css</b> with the following:

```css
.details{
  display: flex;
  flex-direction: column;
  margin-left: 20%;
}

.top-row {
  padding-top: 10%;
  display: flex;
  flex-direction: row;
}

.description {
  padding-top: 5%;
  padding-left: 1%;
  padding-right: 1%;
  padding-bottom: 5%;
}

.spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 20%;
}

#button {
  margin-left: -.1%;
}

@media (max-width: 767.98px) {
  .details{
    display: flex;
    flex-direction: column;
    padding-top: 10%;
  }

  .top-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
  }
}
```

There is a lot happening here so I will break it down so that it can be easily digestable. 

a) We are using <b>React Hooks</b> to initialize our state:

```javascript
const [data, setData] = useState([]);
```

b) We are making an <b>asynchronous</b> api call using the [Fetch Api](https://javascript.info/fetch) to our back-end to retrieve our product data while also adding that data to our state.
	
```javascript
async function fetchProduct() {
    const product = await fetch("api/data/product", { method: 'GET' })
    product
      .json()
      .then(res => setData(res.data))
};
```

c) We then use the React Hook <b>useEffect()</b> method to load the data when the page loads.

```javascript
useEffect(() => {
    fetchProduct()
}, []);

```

d) We are using a front-end library called [MD Bootstrap](https://mdbootstrap.com/) that has many great custom components specifically built for e-commerce. You can see here that we are displaying the data from back-end into the components and JSX. We are also conditionally rendering the page based on if there is data or not with a [ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator). If there is no data it will display a spinner, if there is data, it will display the results.

```javascript
return (
    <div>
      {data.data ?
        <div className="container">
          <MDBCol style={{ maxWidth: "75rem" }}>
            <div className="top-row">
              <MDBCol style={{ maxWidth: "22rem" }}>
                <MDBCard title="S-Works Stumpjumper 29">
                  <MDBCardImage 
                    className="img-fluid" 
                    id="image" 
                    src={data.data[0].primary_image.url_standard} 
                    waves
                  />
                </MDBCard>
              </MDBCol>
              <div className="details">
                <h4><b>{data.data[0].name}</b></h4>
                <div>Specialized</div>
                <br/>
                <h5><b>${data.data[0].price}</b></h5>
                <MDBBtn 
                  gradient="aqua" 
                  id="button" 
                  style={{ width: "8rem" }}
                  onClick={buyProduct}
                  href="https://trailtoad.mybigcommerce.com/cart.php?action=buy&sku=SKU-112&source=buy_button"
                >
                  Buy Now
                </MDBBtn>
              </div>
            </div>  
            <div className="description">
              <h5><b>Description:</b></h5>
              {ReactHtmlParser(data.data[0].description)}
            </div>
          </MDBCol>
        </div>
        : <div className="spinner">
            <Spinner/>
          </div>
        }
    </div> 
  );
}

export default App;
```

e) You may have noticed that the <b>description</b> field in the json file has HTML tags already embedded. To display the description using the HTML Tags, we are using a NPM package called [ReactHtmlParser](https://www.npmjs.com/package/react-html-parser) which will parse the embedded HTML tags.

```javascript
<div className="description">
   <h5><b>Description:</b></h5>
   {ReactHtmlParser(data.data[0].description)}
</div>
```

f) [BigCommerce ‘Buy Now’ Buttons](https://www.bigcommerce.com/apps/buy-buttons/) BigCommerce also has a really cool feature that makes adding products to a cart and checking out a breeze. It is called a <b>Buy Button</b> and can be found here:
	
[https://www.bigcommerce.com/apps/buy-buttons/](https://www.bigcommerce.com/apps/buy-buttons/)

<p align="center">
    <img src="https://imgur.com/6hlIGrp.png">
</p>

Once this is setup, all you need to do, is add the <b>href</b> code to the custom button. Clicking on the button will then automatically add the product to the shopping cart and will redirect users to the checkout page in BigCommerce.

```javascript
<MDBBtn 
  gradient="aqua" 
  id="button" 
  style={{ width: "8rem" }}
  onClick={buyProduct}
  href="https://trailtoad.mybigcommerce.com/cart.php?action=buy&sku=SKU-112&source=buy_button"
>
  Buy Now
</MDBBtn>
```

### 12. Submit the code to GitHub.

First, we need to make sure our API keys are not pushed up in our public repo. In the root directory, add a <b>.gitignore</b> file and add the following:

```
node_modules
package-lock.json
.env
```

Find the <b>client/src/.gitignore</b> and add following:
	
```
package-lock.json
```

Now that we have a working app let's push all the code up to GitHub and get ready to deploy a live site! Create a repository in Github and then run the following commands in the terminal:

```git
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/{yourgithubusername}/{yourreponame}.git
git push -u origin master
```

<br>

### 13. Deploy the live site to Heroku.

We will be using [Heroku](https://www.heroku.com/) to host our live online store. It is free and easy-to-use. Just log in, create an app, and the following steps:

a) Connect the GitHub repository to the app:

<p align="center">
    <img src="https://imgur.com/9dCgXWj.png">
</p>

b) Add the same credentials as your <b>.env</b> file from earlier to have the credentials available in production:

<p align="center">
    <img src="https://imgur.com/wulVNpX.png">
</p>

c) Deploy the application: 

<p align="center">
    <img src="https://imgur.com/mc7I9kz.png">
</p>

After the application has been deployed you can then open the link in your browser and see the magic happen!

<p align="center">
	<img src="https://imgur.com/3Lik9xI.gif">
 </p>

<br>
<hr>

<b>In Conclusion...</b>
 
The BigCommerce API is an easy-to-use yet extremely powerful resource to help quickly launch your own custom online store that can be seamlessly integrated into the existing BigCommerce infrastructure. 

But this demo is just the tip of the iceberg. There are a multitude of BigCommerce API possibilities that can be explored. If this demo peaked you're interest, check out the resources below to unleash the full API capabilities BigCommerce has to offer!  
- [Documentation](https://developer.bigcommerce.com/api-docs)
- [About BigCommerce APIs](https://developer.bigcommerce.com/api-docs/getting-started/about-our-api)
- [Big Commerce API Best Practices](https://developer.bigcommerce.com/api-docs/getting-started/best-practices)
- [Types Of Apps Used With BigCommerce](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/types-of-apps)
 
