import fetch from 'node-fetch';

export default async function handler(req, res) {
  const url = 'https://script.google.com/macros/s/AKfycbwqjmsgX5v1kvx94Q913Yym1MkbwxqAyKURxASeBzZfSK9MHUUQFc6Konvjwb2Q58pQ/exec';

  try {
    let response;

    if (req.method === 'GET') {
      response = await fetch(url);
      const data = await response.json();
      res.status(200).json(data);
    } else if (req.method === 'POST') {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });
      const text = await response.text();
      res.status(200).send(text);
    } else {
      res.status(405).send('Method Not Allowed');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
