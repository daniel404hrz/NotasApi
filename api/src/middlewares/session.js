import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Users } from "../models/users.js";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

export const authMidd = async (req, res, next) => {
  try {
    if (!req.cookies || !req.cookies.localSession) {
      return res.status(401).json({
        error: "Necesita iniciar sesión",
      });
    }

    const dataToken = await verifyToken(req.cookies.localSession);
    
    if (!dataToken || !dataToken.id) {
      return res.status(401).json({
        error: "ERROR_ID_TOKEN",
      });
    }

    const user = await Users.findByPk(dataToken.id);
    if (!user) {
      return res.status(401).json({
        error: "Usuario no encontrado",
      });
    }

    const userJson = user.toJSON();
    delete userJson.password;
    req.user = userJson;
    next();
  } catch (error) {
    res.status(401).json({
      error: "NOT_SESSION",
    });
  }
};