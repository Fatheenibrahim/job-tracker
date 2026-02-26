import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js"
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
  res.send("Job Tracker API running");
});


// app.post("/user", async(req,res)=>{
//   name: req.body.name;
//   email:req.body.email;
//   password:req.body.password;
//   console.log("inside post")
//   res.send("posted")
// })

// app.get("/users", async(req,res)=>{
//   const ans = await User.find()
//   res.json(ans);
// })

export default app;
