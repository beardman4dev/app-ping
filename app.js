"use strict"

const express = require("express")
const app = express()
const port = process.env.PORT || 80

app.get("/", async (req, res) => {
    res.send("Hello. How are your.")
})

app.listen(port, () => {
    console.log("Started")
})
