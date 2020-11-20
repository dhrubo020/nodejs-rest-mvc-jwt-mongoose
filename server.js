
const express = require('express')
const app = express()
const port = 3001
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose');
require('dotenv').config()

// --------- app use -------------
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use((req,res,next) =>{
    console.log('Middleware running');
    next();
})
app.use(morgan('dev'))


//------connect to mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fxpfd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (err)=>{
    console.log(err);
})
db.once('open' , ()=>{
    console.log('db connected');
})


// -------- import router ---------------
const contactRoute = require('./api/routes/contact')
const userRoute = require('./api/routes/user')


// ---------- connect to route ---------------
app.use('/api/contacts', contactRoute);
app.use('/api/user', userRoute);



//-------------- run server ------------
app.get('/', (req, res) => {
    res.send('Backend Server!')
})

app.listen(process.env.PORT || port, () => {
    console.log(`Listening at http://localhost:${port}`)
})