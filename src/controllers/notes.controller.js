import { Notas } from "../models/notas";

export const getNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Notas.findAll({
      where: {
        userId: id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const createNote = async (req, res) => {
  try {
    const { userId, title, notesData } = req.body;
    if (!userId || !title || !notesData)
      res.status(400).json({ error: "Faltan datos" });
    const newUser = await Notas.create({
      userId,
      title,
      notesData,
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const nota = await Notas.findByPk(Number(id));

    if (!nota) return res.status(400).json({ error: "Esta Nota no existe" });
    else
      await Notas.destroy({
        where: { id },
      });
    res.status(200).json({ message: "Nota borrada exitosamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const putNote = async (req, res) => {
  try {
    const { id } = req.params;
    const nota = await Notas.findByPk(id);
    if(!nota)return res.status(400).json({ error: "Esta Nota no existe" });
    else {
        nota.set(req.body);
        await nota.save();

        res.status(200).json(nota);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
    
        const nota = await Notas.findByPk(Number(id));
    
        if (!nota) return res.status(400).json({ error: "Esta Nota no existe" });
        else res.status(200).json(nota);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }

};
