import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  // Ruta de la imagen en la carpeta "public"
  const imagePath = "https://img2.rtve.es/i/?w=1600&i=1614352806474.png";

  res.send(`
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #000;
        text-align: center;
        padding: 10px;
      }

      h1 {
        color: #fff;
      }

      img {
        max-width: 70%;
        height: auto;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    
    <img src="${imagePath}" alt="Imagen de banana">
    <h1>ESTA VIVOOOOOO ;)</h1>
  </body>
</html>
  `);
});

export default router;