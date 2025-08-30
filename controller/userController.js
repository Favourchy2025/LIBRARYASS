const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../sendEmail"); 



const signUp = async (req, res) => {
    try {
        let { name, email, password, role } = req.body;

  if (!name ||  !email || !password) {
    return res.status(400).json({ message: "All field are required" });
  }

   let checkEmail = await User.findOne({email});

  if(checkEmail) return res.json({message:"Account already exists, login"})

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  let welcomeEmail = `
    <h1>Welcome to my Library, ${name}!</h1>
    <p>Thank you for joining us. We are excited to have you on board.</p>
    <p>Feel free to explore and share your thoughts with the community.</p>
    <p>Best regards,</p>
    <p>The NeloBlog Team</p>
  `;

  await sendEmail(email, "Welcome to library", welcomeEmail);

  res.status(201).json({ message: "User created successfuly!" });
     
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log(error);
    }
};

const login = async (req,res)=>{
  try {
    let {email, password} = req.body;

    let checkEmail = await User.findOne({email});

    if(!checkEmail) return res.status(404).json({message:"user not found"})

    let checkPassword = await bcrypt.compare(password, checkEmail.password)
    console.log(checkPassword)

    if(!checkPassword) res.status(400).json({message:"Incorrect Password"})

    let token = jwt.sign({
        id: checkEmail._id, 
        role: checkEmail.role
      },
      process.env.SECRETKEY,
      {expiresIn: '1h'}
    )

     res.cookie('token', token, {
      httpOnly: true, 
      secure: false,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });


    res.status(200).json({
      message: "Login successful"
    });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log(error);
    }
};

const myusers = async (req,res)=>{
  try {
    let allUsers = await User.find();
    

    if(!allUsers) return res.status(404).json({message: "No user found"})

    res.status(200).send(allUsers)

  } catch (error) {
    res.status(500).json({message: "Internal server error"});
    console.log(error)
  }
}



const getOneUser = async (req,res)=>{
  try {

    let {id} = req.params;

    let uu = await User.findById(id)

    if(!uu) return res.status(404).json({message: "user not found"})

    res.status(200).send(uu)

  } catch (error) {
    res.status(500).json({message: "Internal server error"});
    console.log(error)
  }
}


const delUser = async (req,res)=>{
  try {
    let {id} = req.params;
    
    let jojoUser = await User.findByIdAndDelete(id)

    if(!jojoUser) return res.status(404).json({message: "user not found"})

    res.status(200).json({message: "user deleted successfully"});
    
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
    console.log(error)
  }
}


const editUser = async (req,res)=>{
  try {
    let {id} = req.params;

    let newData = req.body;

    let changedUser = await User.findByIdAndUpdate(id,newData,{new:true})

    if(!changedUser) return res.status(404).json({message: "user not found"})

    res.status(200).json({message: "user updated successfully"});
    
  } catch (error) {
      res.status(500).json({message: "Internal server error"});
    console.log(error)
  }
}

module.exports = {
    signUp,
    getOneUser,
    myusers,
    login,
    delUser,
    editUser
};