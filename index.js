import express from "express";
import { connectDB } from "./db.js";
import { Card } from "./models/Cards.js";
import cors from "cors";

const app = express();
connectDB();

// Configuración de CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "[https://cards9b.onrender.com](https://cards9b.onrender.com)",
    ], // Permitir localhost y tu frontend desplegado
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// CREATE CARD
app.post("/createCard", async (req, res) => {
  try {
    const createCard = await Card.create(req.body);
    res.status(201).json({
      message: "Card created successfully",
      data: createCard,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error creating card" });
  }
});

// UPDATE CARD
app.put("/updateCard/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    ```
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
```;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating card" });
  }
});

// DELETE CARD
app.delete("/deleteCard/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCard = await Card.findByIdAndDelete(id);

    ```
if (!deletedCard) {
  return res.status(404).json({ message: "Card not found" });
}
res.status(200).json({ message: "Card deleted successfully" });
```;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting card" });
  }
});

// GET ALL CARDS
app.get("/getAllCards", async (req, res) => {
  try {
    const cards = await Card.find();
    console.log(cards);
    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cards" });
  }
});

// GET CARD BY ID
app.get("/getCard/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    res.status(200).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching card" });
  }
});

// ENDPOINTS
app.get("/endpoints", async (req, res) => {
  try {
    const template = [
      {
        path: "[https://cards9b.onrender.com/getAllCards](https://cards9b.onrender.com/getAllCards)",
        method: "GET",
        description: "trae todas las cartas",
      },
      {
        path: "[https://cards9b.onrender.com/getCard/](https://cards9b.onrender.com/getCard/):id",
        method: "GET",
        description: "Trae cartas por id",
      },
      {
        path: "[https://cards9b.onrender.com/createCard](https://cards9b.onrender.com/createCard)",
        method: "POST",
        description: "Crea la carta",
      },
      {
        path: "[https://cards9b.onrender.com/updateCard/](https://cards9b.onrender.com/updateCard/):id",
        method: "PUT",
        description: "Actualiza las cartas parcial o completamente",
      },
      {
        path: "[https://cards9b.onrender.com/deleteCard/](https://cards9b.onrender.com/deleteCard/):id",
        method: "DELETE",
        description: "Borra una carta",
      },
    ];
    res.json(template);
  } catch (error) {
    console.error("no se pudo andar chaval", error);
    res.status(500).json({ message: "Error fetching endpoints" });
  }
});

// Configurar puerto (Render o local)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
