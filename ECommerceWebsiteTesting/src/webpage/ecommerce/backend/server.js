const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/orders", require("./routes/orders"));

app.listen(3000, () =>
    console.log("Server running on port 3000")
);
