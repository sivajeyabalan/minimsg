const express = require("express");
const app = express();
const port = 8080;
const path = require("node:path");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

app.post("/new", (req, res) => {
  const message = req.body;
  message.added = new Date();

  messages.push({
    text: message.msg,
    user: message.username,
    added: new Date(),
  });
  res.redirect("/");
});
app.get("/", (req, res) =>
  res.render("index", { title: "Mini Messageboard", messages: messages })
);
app.get("/new", (req, res) => res.render("form"));
app.get("/message/:id", (req, res) => {
  const id = req.params.id;
  const message = messages[id];
  if (message) {
    res.render("message", {
      title: "Message Details",
      id: id,
      message: message,
    });
  } else {
    res.send("Invalid message");
  }
});
app.listen(port, () => console.log(`App listening on port ${port}`));
