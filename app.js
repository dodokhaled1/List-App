const express = require("express")
const bodyParser = require("body-parser")


const app = express()
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))


const routes = require('./server/routes/user')
app.use('/', routes)
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port 8000`)
})
