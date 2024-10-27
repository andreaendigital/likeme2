const { leerPosts, escribirPosts } = require("./funciones"); //importamos funciones

const cors = require("cors"); // importamos cors
//Habilitar los cors en el servidor utilizando el paquete de npm.

const express = require("express"); //importamos express
const app = express(); //instanciamos express

const fs = require("fs"); // importamos fs
const port = 3000; //definimos puerto

app.listen(port, () => console.log("Servidor escuchando en puerto 3000")); // levantamos servidor

app.use(express.json()); //midleware
app.use(cors()); //uso de cors

//Crear una ruta GET con Express para devolver los registros de una tabla alojada en PostgreSQL.
//ruta GET
app.get("/posts", async (req, res) => {
    const obtenerPost = await leerPosts();
    res.json(obtenerPost);
  });

//Crear una ruta POST con Express que reciba y almacene en PostgreSQL un nuevo registro.
  //ruta POST
app.post("/posts", async (req, res) => {
  const { titulo, url, descripcion } = req.body;
  await escribirPosts(titulo, url, descripcion);
  res.send("El post fue agregado");
});

//comprobación de conexiones y agregar muestra a bbdd -> ok