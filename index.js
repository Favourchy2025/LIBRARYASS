const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const UserRoute = require('./routes/userRoute') 
const bookRoutes = require('./routes/bookRoutes')
const authorRoutes = require('./routes/authorRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config()
const port = process.env.PORT || 5540

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

mongoose.connect(process.env.MONGODB_URL)
        .then(()=> console.log("Mongodb connected"))
        .catch((error)=>console.log(error))

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.get('/',(req,res)=>{
    res.send("Welcome to mongodb")
})

app.use('/users', UserRoute)

app.use('/book', bookRoutes)

app.use('/author', authorRoutes)



app.listen(port,()=>{
    console.log("Server is running on port :" + port)
})
