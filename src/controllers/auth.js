import dotenv from "dotenv";
import { Users } from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

dotenv.config();
const { JWT_SECRET } = process.env;

const tokenSign = async (user) => {
  const sign = jwt.sign(
    {
      id: user.id,
      name: user.name,
      gmail: user.gmail,
    },
    JWT_SECRET,
    {
      expiresIn: "23h",
    }
  );
  return sign;
};

export const auth = async (req, res) => {
  try {
    const { gmail, password } = req.body;
    const user = await Users.findOne({
      where: {
        gmail,
      },
      
    });
    
    if (!user) {
      res.status(404).json("USER_NO_REGISTRADO");
      return;
    }
    const hashPassword = user.password;
    const check = await bcrypt.compare(password, hashPassword);
    
    if (!check) {
      res.status(401).json("PASSWORD_INVALID");
      return;
    }
    const token = await tokenSign(user);
    const expirationTime = 24 * 60 * 60 * 1000;

    res.cookie("localSession", token, {
      expires: new Date(Date.now() + expirationTime),
      httpOnly: true,
    });
    res.json({
      token: token,
      user
    });
  } catch (error) {
    res.status(500).send("Authentication error");
  }
};