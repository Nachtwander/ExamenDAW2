const express = require("express");
const Usuarios = require("./Models/usuarios");
const Eventos = require("./Models/evento");
const cors = require("cors");
const { where } = require("sequelize");

const app = express();

app.use(express.json());

app.use(cors());

app.listen(5000, () => {
  console.log("ejecutando en puerto 5000");
});

//solo necesito obtener los usuarios de la base de datos
app.get("/usuario", async (req, res) => {
  try {
    //SELECT * FROM usuarios
    const usuarios = await Usuarios.findAll();
    if (usuarios.length == 0) {
      res.status(400).json({ mensaje: "Sin registros de usuarios" });
    } else {
      res.status(200).json(usuarios);
    }
  } catch (error) {
    res.status(500).json({ Error: "Ocurrio un error en la peticion" });
  }
});

//obtener eventos
app.get("/evento", async (req, res) => {
  try {
    //SELECT * FROM eventos
    const eventos = await Eventos.findAll();
    if (eventos.length == 0) {
      res.status(400).json({ mensaje: "Sin registros de eventos" });
    } else {
      res.status(200).json(eventos);
    }
  } catch (error) {
    res.status(500).json({ Error: "Ocurrio un error en la peticion" });
  }
});

//crear eventos
app.post("/evento", async (req, res) => {
  try {
    console.log(req.body);
    const evento = await Eventos.create(req.body);
    res.status(200).json(evento);
  } catch (error) {
    res.status(500).json({ Error: "Ocurrio un error al crear el evento" });
  }
});

app.put("/evento/:id", async (req, res) => {
  try {
    //update evento
    const [updated] = await Eventos.update(req.body, {
      //donde id = id del evento
      where: { id: req.params.id },
    });
    if (updated) {
      res.status(200).json({ mensaje: "Evento actualizado correctamente" });
    } else {
      res
        .status(400)
        .json({ mensaje: "No se encontro registro de evento para actualizar" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        mensaje:
          "Ocurrio un error al actualizar el evento, todos los campos son obligatorios excepto comentarios",
      });
  }
});

app.delete("/evento/:id", async (req, res) => {
  try {
    const deleted = await Eventos.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ mensaje: "Evento elimando correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Ocurrio un error" + error });
  }
});
