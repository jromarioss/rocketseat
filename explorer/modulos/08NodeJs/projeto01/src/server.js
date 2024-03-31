const express = require('express');

const app = express(); // inicializa

app.get('/message/:id', (request, response) => { // /:id recebe o id no paramentro
  const { id } = request.params; // tira o id do request
  response.send(`hello word e o id ${id}`)
});/* parou 727 */

const PORT = 3333; // porta
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))