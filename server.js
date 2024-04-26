const express = require('express');
const connectDB = require('./config/db')
const path = require('path');




const app= express();

// Connect to mongo DB
connectDB();


//initialize middleware
app.use(express.json({extended: false}));

//define routes

app.use('/api/users' , require('./routes/user'));
app.use('/api/auth' , require('./routes/auth'));
/////////////////////////Sends Email//////////////////////////////


//server static assets in production

if (process.env.NODE_ENV === 'dev') {
    //set static folder
    app.use(express.static('noko/build'));

    app.get('*',(req,res) => res.sendFile(path.resolve(__dirname, 'noko', 'build','index.html')))
} 

const PORT = process.env.PORT || 4000;  

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
