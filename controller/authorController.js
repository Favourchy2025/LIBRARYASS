const Author = require("../model/author");
const bcrypt = require("bcryptjs");


const createauthor = async (req, res) => {
  try {
    let { name , bio, birthdate } = req.body;

    if (!name || !bio || !birthdate) {
      return res.status(400).json({ message: "All field are required" });
    }

    
    const newauthor = await Author.create({
      name,
      bio,
      birthdate
    });
    
    res.status(201).json({ message: "Author created successfuly!" });
  } catch (error) {
    console.error("Error creating author:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const myauthors = async (req,res)=>{
  try {
    let allauthors = await Author.find();

    if(!allauthors) return res.status(404).json({message: "No author found"})

    res.status(200).send(allauthors)

  } catch (error) {
    res.status(500).json({message: "Internal server error"});
    console.log(error)
  }
}


const getOneAuthor = async (req,res)=>{
  try {

    let {id} = req.params;

    let jojo = await Author.findById(id)

    if(!jojo) return res.status(404).json({message: "author not found"})

    res.status(200).send(jojo)

  } catch (error) {
    res.status(500).json({message: "Internal server error"});
    console.log(error)
  }
}


const delAuthor = async (req,res)=>{
  try {
    let {id} = req.params;
    
    let jojoAuthor = await Author.findByIdAndDelete(id)

    if(!jojoAuthor) return res.status(404).json({message: "author not found"})

    res.status(200).json({message: "author deleted successfully"});
    
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
    console.log(error)
  }
}


const edit1Author = async (req,res)=>{
  try {
    let {id} = req.params;

    let newData = req.body;

    let changedAuthor = await Author.findByIdAndUpdate(id,newData,{new:true})

    if(!changedAuthor) return res.status(404).json({message: "author not found"})

    res.status(200).json({message: "author updated successfully"});
    
  } catch (error) {
      res.status(500).json({message: "Internal server error"});
    console.log(error)
  }
}

module.exports = {
    createauthor,
    myauthors,
    getOneAuthor,
    delAuthor,
    edit1Author
}
