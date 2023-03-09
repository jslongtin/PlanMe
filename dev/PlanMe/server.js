const express = import("express");
const bodyParser = import("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const users = [
  { email: "a@a.a", password: "a" },
  { email: "b@b.b", password: "b" },
  { email: "c@c.c", password: "c" },
];

// POST /login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
