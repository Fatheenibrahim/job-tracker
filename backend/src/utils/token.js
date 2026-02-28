import jwt from "jsonwebtoken"

export const generateToken = (payload)=>{
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRES_IN
    });
};

// if anything goes wrong sign() returns -> "Undefined"