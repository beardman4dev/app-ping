"use strict"
;(async () => {
    const express = require("express")
    const app = express()
    const port = process.env.PORT || 80

    await require("./connect/mongodb").initSharedConnections(["common"])

    require("./worker/workingLog")

    await require("./controlles")(app)

    app.listen(port, () => {
        console.log("Started")
    })
})()
