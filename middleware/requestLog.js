"use strict"

const envVars = require("../common/envVars")
const db = require("../connect/mongodb")
const testCol = db.col("common/test.logReq")

module.exports = (req, res, next) => {
    log(req)
    next()
}

async function log(req) {
    await testCol.insertOne({
        env: envVars.env,
        route: req?.originalUrl || "undefined",
        host: req?.headers?.host || "local",
    })
}
