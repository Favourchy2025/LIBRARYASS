const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,  
        required: true,
    },
    
    bio: {
        type: String,  
        required: false,
    }, 

    birthdate: {
        type: Date,  
        required: true,
    }
   
},{timestamps:true});


const Author = mongoose.model('author', authorSchema);

module.exports = Author;