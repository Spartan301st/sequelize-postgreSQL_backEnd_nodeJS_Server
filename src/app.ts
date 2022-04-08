import express, {Router} from "express";
// importing necessary classes and interfaces from repos
import {IUserRepository, UserRepository} from "./repositories/user.repository";
import {IAccountRepository, AccountRepository} from "./repositories/account.repository";
import {IPostRepository, PostRepository} from "./repositories/post.repository";
import './models/index';

import path from "path";

const app = express();
// app.set("views", path.join(__dirname, "views"))
// app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// home page
app.get("/", (req, res) => {
    // res.render("index");
    res.send("<h1>Home page</h1>")
});
// Router for different pages
app.use("/user", require("./routes/user"))
app.use("/account", require("./routes/account"))
app.use("/post", require("./routes/post"))

app.listen(3000, () => console.log("Listening on port 3000"));