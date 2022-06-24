"use strict"
;(async () => {
    const express = require("express")
    const app = express()
    const port = process.env.PORT || 80

    await require("./connect/mongodb").initSharedConnections(["common"])

    await require("./controlles")(app)

    app.listen(port, () => {
        console.log("Started")
    })
})()
