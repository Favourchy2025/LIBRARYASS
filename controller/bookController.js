const Book = require("../model/book");
const bcrypt = require("bcryptjs");

const registerBooks = async (req, res) => {
  try {
    let { title, author, date } = req.body;

    if (!title || !author || !date) {
      return res.status(400).json({ message: "All field are required" });
    }

    const newBook = await Book.create({
      title,
      author,
      date,
    });

    res.status(201).json({ message: "Book created successfuly!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

const getOneBook = async (req, res) => {
  try {
    let { id } = req.params;

    let jojo = await Book.findById(id);

    if (!jojo) return res.status(404).json({ message: "book not found" });

    res.status(200).send(jojo);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

const mybooks = async (req, res) => {
  try {
    let allbooks = await Book.find();

    if (!allbooks) return res.status(404).json({ message: "No user found" });

    res.status(200).send(allbooks);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

const delBook = async (req, res) => {
  try {
    let { id } = req.params;

    let jojoBook = await Book.findByIdAndDelete(id);

    if (!jojoBook) return res.status(404).json({ message: "book not found" });

    res.status(200).json({ message: "book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

const edit1Book = async (req,res)=>{
  try {
    let {id} = req.params;

    let newData = req.body;

    let changedBook = await Book.findByIdAndUpdate(id,newData,{new:true})

    if(!changedBook) return res.status(404).json({message: "book not found"})

    res.status(200).json({message: "book updated successfully"});
    
  } catch (error) {
      res.status(500).json({message: "Internal server error"});
    console.log(error)
  }
}


module.exports = {
  registerBooks,
  getOneBook,
  mybooks,
  delBook,
  edit1Book
};
