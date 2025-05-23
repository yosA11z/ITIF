import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const apiUrl = 'https://script.google.com/macros/s/AKfycbx5sHUFq9DV1FRkrCDOZlIcIqycKiXxulmUYtBuvBlupkZVMfLzbf_D1BcCM80QRwKB/exec';

    const fetchOptions = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (req.method === 'POST') {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(apiUrl, fetchOptions);

    const text = await response.text();

    // Imprime el texto crudo para debug
    console.log('Respuesta cruda de Apps Script:', text);

    // Trata de parsear el JSON, si falla, responde el texto plano
    try {
      const data = JSON.parse(text);
      res.setHeader('Content-Type', 'application/json');
      res.status(response.status).send(data);
    } catch (err) {
      // No es JSON, manda texto plano
      res.status(response.status).send(text);
    }
  } catch (error) {
    console.error('Error en proxy:', error);
    res.status(500).send('Error en proxy: ' + error.message);
  }
}
