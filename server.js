const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname)); // sirve archivos estáticos

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'iniciarSesion.html'));
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
