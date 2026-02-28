import User from "../models/user.model.js"
import { hashPassword } from "../utils/hash.js";
import { comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/token.js";

export const registerUser = async (req, res) => {
    // console.log("REGISTER API HIT");
  try {
    const { name, email, password } = req.body;
    // console.log("Body received", req.body);

    if (!name || !email || !password) {
      res.send("All filed required");
    }
    // if email is already registered
    const existingUser = await User.findOne({ email });
    // console.log("DB query finished");
    if (existingUser) {
      res.status(409).send("User already exist");
    }

    // hash password
    const hashedPassword = await hashPassword(password);
    // console.log("Password hashed");

    // save user to DB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    // console.log("User saved");

    // response
    res.status(201).json({
      Message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).send;
  }
};

export const loginUser = async(req, res)=>{
  try{
    const {email,password} = req.body;

    // validate user
    if(!email || !password){
      res.status(400).json({message:"Email and password required"})
    }

    // find if user exist
    const user = await User.findOne({email});
    if(!user){
      res.status(401).json({message : "Invalid credentials!"})
    }

    // compare password
    const isMatch = await comparePassword(password, user.password);
    if(!isMatch){
      res.status(401).json({message : "Invalid credentials!"});
    }

    // Token generation
    const token = generateToken({
      userId:user._id,
      email:user.email
    });
    console.log("generted token succesfully")
    console.log(token)

    // response
    res.status(200).json({
      Message : "Login succesfull!",
      token,
      User : {
        userId : user._id,
        email : user.email
      }
    });
  } catch(err){
    console.log("Login error",err);
    res.status(500).json({message : "server error"});
  }
}
