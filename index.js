const express = require("express");
const app = express();
const path = require("path");
const getRSSFeed = require("./src/services/getRSSFeed");
const generateHTMLFromRSS = require("./src/services/generateHTMLFromRSS");
const parseRSSFeed = require("./src/services/parseRSSFeed");
const router = express.Router();
const port = process.env.port || 3000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

router.get("/", async (req, res) => {
    const rawFeed = await getRSSFeed();
    const feed = parseRSSFeed(rawFeed);
    const htmlContent = generateHTMLFromRSS(feed);
    res.render("index", { content: htmlContent });
});

app.use("/", router);
app.listen(port);

console.log(`Running at Port ${port}`);