import { Users } from "../models/users";
import bcrypt from 'bcrypt';
export const getUsers = async (req, res) => {
  const users = await Users.findAll({
    attributes: ['id', 'gmail','name','password'], // Especificar los campos que deseas seleccionar
  });
  res.json(users);
};
export const createUsers = async (req, res) => {
  try {
    const { name, gmail, password } = req.body;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Encriptar la contraseña utilizando el salt
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await Users.create({
      name,
      gmail,
      password:hashedPassword,
    });

    res.status(200).json(newUser);
  } catch (error) {
    
    if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ error: 'The gmail is already registered' });
      } else {
    // res.status(500).json({ error: 'Internal Server Error' });
    res.status(500).json(error.message)
  }}
};
export const deleteUser = async (req, res) => {
    try {
        const id = Number(req.params.id);
    await Users.destroy({
        where:{
            id,
        },
    });
    res.sendStatus(204)
        
    } catch (error) {
        
        return res.status(500).json(error.message)
        
    }
  };
export const userLog = async (req, res) => {
    try {
        const id = req.params.id;
    const {name,gmail} = await Users.findByPk(id);
    res.json({name,gmail});
        
    } catch (error) {
        return res.status(500).json(error.message)
        
    }
};
