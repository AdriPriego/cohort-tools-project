
module.exports = (app) => {
    //Error Handling
//Error 404
app.use((req, res, next) => {
    res.status(404).json({ErrorMessage: "La ruta no ha sido encontrada"})
  })
  
  //Error 500
  app.use((error, req, res, next) => {
    res.status(500).json({ErrorMessage: "Servidor petado"})
  })
}