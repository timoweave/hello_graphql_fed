const express = require("express");
const {
  index: { port }
} = require("./config");

const app = express();

app.get("/hello", (req, res) => {
  res.json({ message: "hello, there" });
});

app.get("/", (req, res) => {
  res.json({ host: "https://lk8u4.sse.codesandbox.io", port: port });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
