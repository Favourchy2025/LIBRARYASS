const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,  
    }, 
    
    author:{
        type: String,
    },

    date: {
        type: Date, 
    }
   
},{timestamps:true});


const Book = mongoose.model('book',bookSchema);

module.exports = Book;