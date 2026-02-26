import User from "../models/user.model.js"
import { hashPassword } from "../utils/hash.js";

export const registerUser = async (req, res) => {
    console.log("REGISTER API HIT");
  try {
    const { name, email, password } = req.body;
    console.log("2️⃣ Body received", req.body);

    if (!name || !email || !password) {
      res.send("All filed required");
    }
    // if email is already registered
    const existingUser = await User.findOne({ email });
    console.log("3️⃣ DB query finished");
    if (existingUser) {
      res.status(409).send("User already exist");
    }

    // hash password
    const hashedPassword = await hashPassword(password);
    console.log("4️⃣ Password hashed");

    // save user to DB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    console.log("5️⃣ User saved");

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
