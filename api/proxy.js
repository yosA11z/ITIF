import fetch from "node-fetch";

export default async function handler(req, res) {
  const url = "https://script.google.com/macros/s/AKfycbwgQy9i14PMCdUwuh9keinTrMs2Ij9OruxWGYiYY-_HOZdmT2MA3IEF7-HHbyr7jIw/exec"; // Cambia aquí por tu URL

  try {
    const response = await fetch(url);
    const data = await response.text(); // Usamos text para evitar errores si no es JSON válido

    // Aquí agregamos los headers para permitir CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
