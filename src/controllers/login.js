
export const loginSuccess = (req, res) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
      });
    }else{
        res.status(400).json({
            error:"USUARIO_NO_ENCONTRADO"
        })
    }
  };