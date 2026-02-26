import bcrypt from "bcryptjs";

export const hashPassword = async(password)=>{ // for hashing password
    const salt = await bcrypt.genSalt(10); // random string of 10 cost factor
    return bcrypt.hash(password, salt);
}

export const comparePassword = async(password, hashedPassword)=>{
    return bcrypt.compare(password, hashedPassword);
}