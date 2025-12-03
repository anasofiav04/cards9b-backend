import express from "express";
import { connectDB } from "./db.js";
import { Card } from "./models/Cards.js";
import cors from "cors";
const app = express();
connectDB();
//app representa el servidor

app.use(express.json());
app.use(cors());

const card = await Card;

//CREATE CARD
app.post("/createCard", async (req, res) => {
  try {
    const createCard = await card.create(req.body);

    res.status(201).json({
      message: "Card created successfully",
      data: createCard,
    });
  } catch (error) {
    console.error(error.message);
  }
});
//UPDATE CARD
app.put("/updateCard/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedCard = await Card.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json({
      message: "Card updated successfully",
      data: updatedCard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating card" });
  }
});

//DELETE CARD
app.delete("/deleteCard/:id", async (req, res) => {
  try {
    const { id } = req.params; //  se lee el ID de la URL
    const deletedCard = await Card.findByIdAndDelete(id); // aqui usar la varibale que esta hasta arriba que se llama cards

    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting card" });
  }
});

//GET CARD
app.get("/getAllCards", async (req, res) => {
  try {
    const card = await Card.find(); //usar varaible varible card
    console.log(card);
    res.status(200).json(card);
  } catch (error) {
    console.error(error);
  }
});

app.get("/getCard/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    res.status(200).json(card);
  } catch (error) {
    console.error(error); // podrías mandar una respuesta al cliente si algo falla :)
  }
});

app.get("/endpoints", async (req, res) => {
  try {
    const template = [
      {
        path: "https://cardss9b.onrender.com/getAllCards",
        method: "GET",
        description: "trae todas las cartas",
      },
      {
        path: "https://cards9b.onrender.com/getCard/:id",
        method: "GET",
        description: "Trae cartas por id",
      },
      {
        path: "https://cards9b.onrender.com/createCard",
        method: "POST",
        description: "Crea la carta",
      },
      {
        path: "https://cards9b.onrender.com/updateCard/:id",
        method: "PUT",
        description: "Actualiza las cartas parcial o completamente",
      },
      {
        path: "https://cards9b.onrender.com/deleteCard/:id",
        method: "DELETE",
        description: "Borra una carta",
      },
    ];
    res.json(template);
  } catch (error) {
    console.error("no se pudo andar chaval", error);
  }
});

app.listen(3000, () => {
  console.log("Servidor ejecutandose en https://localhost:3000");
});
