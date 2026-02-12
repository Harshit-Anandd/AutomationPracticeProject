const router = require("express").Router();
const db = require("../db");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    db.query(
        "INSERT INTO users(name,email,password) VALUES(?,?,?)",
        [name, email, hash],
        () => res.send("Registered")
    );
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        async (err, rows) => {
            if (!rows.length) return res.status(401).send();

            const match = await bcrypt.compare(
                password,
                rows[0].password
            );

            if (!match) return res.status(401).send();

            req.session.user = rows[0];
            res.send("Logged in");
        }
    );
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.send("Logged out");
});

module.exports = router;
