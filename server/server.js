import express from "express";

const app = express();
const PORT = 5000;

app.use(express.urlencoded());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    res.status(200).send({ message: "the server is running well" });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

app.listen(PORT, () => {
  console.log(`The server serving on http://localhost:${PORT} `);
});
