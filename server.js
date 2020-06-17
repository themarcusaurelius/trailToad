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

app.listen(PORT, () => console.group(`Serva Started On ${PORT}`));