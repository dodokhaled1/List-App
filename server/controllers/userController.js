const mongoose = require("mongoose")
const _ = require('lodash')

mongoose.connect("mongodb+srv://mhamadkhaled:ee7f8884@cluster0.x1qzpau.mongodb.net/listDB")

const itemSchema = mongoose.Schema({
    name: String,
  });
  const Item = mongoose.model("Item", itemSchema)
  const item1 = new Item({
    name: "Welcome To Your list!"
  });
  const item2 = new Item({
    name: "Hit The + Button to add new item!"
  });
  const item3 = new Item({
    name: "<-- Hit This to delete item!"
  })
  const defaultItem = [item1, item2, item3]
  
  const listSchema = mongoose.Schema({
    name: String,
    items: [itemSchema]
  })
  const List = mongoose.model("List", listSchema)
  
  exports.view = ("/", (req, res) => {
    Item.find({}, (err, result) => {
      if (result.length === 0) {
        Item.insertMany(defaultItem, (err) => {
          if (err) throw err
          console.log("items got added")
        })
        res.redirect("/")
      } else {
        res.render("list", { listTitle: "Today", newListItems: result })
      }
    })
  })
  exports.route = ("/:listName", (req, res) => {
    const listName = _.capitalize(req.params.listName)
    List.findOne({ name: listName }, (err, results) => {
      if (!err) {
        if (!results) {
          const list = new List({
            name: listName,
            items: defaultItem
          })
          list.save()
          res.redirect("/" + listName)
        } else {
          res.render("list", {listTitle: results.name, newListItems: results.items})
        }
      }
    })
  })
  exports.addList = ("/", (req, res) => {
    let itemName = req.body.newItem
    const listName  =req.body.list
    const item = new Item({
      name: itemName
  })
      if (listName === 'Today') {
          item.save()
           res.redirect("/")
      } else {
          List.findOne({name: listName}, (err, result)=>{
          result.items.push(item)
          result.save()
          res.redirect('/' + listName)
          })
      }
    })
  exports.remove = ("/delete", (req, res) => {
    const checkedItemId = req.body.checkbox
    const listName = req.body.listName
    if(listName === 'Today'){
    Item.findByIdAndRemove(checkedItemId, (err) => {
      if (!err) {
        console.log("item got deleted")
        res.redirect("/")
        }
      })
     } else {
      List.findOneAndUpdate({name: listName}, {$pull: {items: {_id:checkedItemId}}}, (err, results)=>{
          if(!err){
              res.redirect('/' + listName)
          }
      })}
  })












/*

  app.get("/", (req, res) => {
    Item.find({}, (err, result) => {
      if (result.length === 0) {
        Item.insertMany(defaultItem, (err) => {
          if (err) throw err
          console.log("items got added")
        })
        res.redirect("/")
      } else {
        res.render("list", { listTitle: "Today", newListItems: result })
      }
    })
  })
  app.get("/:listName", (req, res) => {
    const listName = _.capitalize(req.params.listName)
    List.findOne({ name: listName }, (err, results) => {
      if (!err) {
        if (!results) {
          const list = new List({
            name: listName,
            items: defaultItem
          })
          list.save()
          res.redirect("/" + listName)
        } else {
          res.render("list", {listTitle: results.name, newListItems: results.items})
        }
      }
    })
  })
  app.post("/", (req, res) => {
    let itemName = req.body.newItem
    const listName  =req.body.list
    const item = new Item({
      name: itemName
  })
      if (listName === 'Today') {
          item.save()
           res.redirect("/")
      } else {
          List.findOne({name: listName}, (err, result)=>{
          result.items.push(item)
          result.save()
          res.redirect('/' + listName)
          })
      }
    })
  app.post("/delete", (req, res) => {
    const checkedItemId = req.body.checkbox
    const listName = req.body.listName
    if(listName === 'Today'){
    Item.findByIdAndRemove(checkedItemId, (err) => {
      if (!err) {
        console.log("item got deleted")
        res.redirect("/")
        }
      })
     } else {
      List.findOneAndUpdate({name: listName}, {$pull: {items: {_id:checkedItemId}}}, (err, results)=>{
          if(!err){
              res.redirect('/' + listName)
          }
      })}
  })*/