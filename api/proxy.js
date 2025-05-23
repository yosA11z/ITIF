import fetch from "node-fetch";

export default async function handler(req, res) {
  const url = "https://script.google.com/macros/s/AKfycbzBM8aAQ-8a0HGZOxnDGKEVZLNWfI1UmQEuk43yYjo_OHy2VJ2rMJ7NvXIg33GJqMml/exec"; // ← reemplaza TU_URL con el ID de tu App Script

  try {
    const response = await fetch(url);
    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({ error: "Respuesta inválida del servidor: " + text });
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
