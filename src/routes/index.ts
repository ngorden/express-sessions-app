import { Router } from "express";

const router = Router();
const Users: any[] = [];

router.post("/login", (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) {
    res.status(400).json({ error: "Enter Username and Password" });
  } else {
    let user = Users.filter(
      (user) => user.id === id && user.password === password
    );
    if (user.length !== 1) {
      res.status(500).json("User not found");
    }

    user = user[0];
    req.session!.user = user;
    res.status(200).end();
  }
});

router.get("/logout", (req, res) => {
  req.session!.destroy((err) => {
    if (err) console.error(err);
  });

  res.status(200).end();
});

router.post("/signup", (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) {
    res.status(400).json({ error: "Invalid details." });
  } else {
    if (Users.filter((user) => user.id === id).length > 0) {
      res.status(200).end();
    }

    let newUser = { id, password };
    req.session!.user = newUser;
    Users.push(newUser);
    console.log(Users);
    res.redirect("/");
  }
});

export default router;
