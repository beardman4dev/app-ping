"use strict"
;(async () => {
    const envVars = require("./common/envVars")
    const express = require("express")
    const app = express()

    await require("./connect/mongodb").initSharedConnections(["common"])

    require("./worker/workingLog")
    app.use(require("./middleware/requestLog"))

    await require("./controlles")(app)

    app.listen(envVars.port, () => {
        console.log("Started")
    })
})()
