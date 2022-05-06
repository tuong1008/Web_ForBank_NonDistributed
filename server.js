const express = require("express");
const app = express();
const path = require("path");

app.use("/static", express.static(path.resolve(__dirname, "fe", "static")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname,"fe", "index.html"));
});

app.listen(process.env.PORT || 5000, () => console.log("Server running..."));
