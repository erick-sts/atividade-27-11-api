const express = require("express");
const taskRoutes = require("./src/routes/routes");

const app = express();
const port = 3000;

app.use(express.json());

app.use("/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta:${port} 🚀`);
});
