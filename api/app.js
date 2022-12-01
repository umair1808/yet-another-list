const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

const dateHelper = require(__dirname + "/modules/" + "date.js");
const repository = require(__dirname + "/modules/" + "repository.js")

const app = express();

app.listen(3000, () => {
    console.log("server is listening on port 3000");
});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => { 
    res.render("index", {item: null});
});

app.get("/list/:name?", async (req, res) => {

    if(typeof(req.params.name) !== 'undefined') {
        res.render("index", { day: dateHelper.getDate(), item: await repository.getListByName(req.params.name)});
    } 
    else{
        res.render("index", { day: dateHelper.getDate(), item: await repository.getDefaultList()});
    }
});

app.post("/list/:id", async (req, res) => {

        const listId = req.params.id;
        const item = req.body.item;

        if(item.length > 0) {
          await repository.addItem(item, listId);
          
        }

        const list = await repository.getList(listId);
        res.redirect(`/list/${list.name}`);
});

app.post("/updateTask/:listId/:taskId", async (req, res) => {

    const item = req.params.taskId
    await repository.updateItem(item);

    const listId = req.params.listId;
    const list = await repository.getList(listId);

    res.redirect(`/list/${list.name}`);
});

app.post("/deleteTask/:listId/:taskId", async (req, res) => {

    const item = req.params.taskId;
    await repository.deleteItem(item)

    const listId = req.params.listId;
    const list = await repository.getList(listId);

    res.redirect(`/list/${list.name}`);
});