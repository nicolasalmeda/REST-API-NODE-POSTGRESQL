const express = require("express");
const studentRoutes = require("./src/student/routes");

const app = express();
const port = 3003;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Funcioando!!!!");
});

app.use("/api/v1/students", studentRoutes);

app.listen(port, () =>
  console.log(`El servidor se esta escuhando en el puerto ${port}`)
);
