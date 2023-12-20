import { Router } from "express";
const router = Router();

app.get("/", (req, res) => {
  

  res.send(<h1>Server is alive</h1>);
});


export default router;