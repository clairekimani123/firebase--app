const { users } = require("../data/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
  const { username, password } = req.body;

 
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

 
  const existing = users.find((u) => u.username === username);
  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }


  const hashedPassword = await bcrypt.hash(password, 10);


  const newUser = { id: users.length + 1, username, password: hashedPassword };
  users.push(newUser);


  res.status(201).json({ message: "User registered successfully", user: { id: newUser.id, username: newUser.username } });
};


exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

 
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });

  res.json({ message: "Login successful", token, user });
};
