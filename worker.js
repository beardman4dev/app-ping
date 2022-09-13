"use strict"

const envVars = require("./common/envVars")

const db = require("../connect/mongodb")
const logCol = db.col("common/test.workingLog")

const startDate = new Date()
let runMinutes = 0

async function log() {
    const lastDate = new Date()
    if (envVars.env === "local") {
        await logCol.findOneAndUpdate(
            { env: envVars.env },
            { $set: { startDate, lastDate, runMinutes, env: envVars.env } },
            { upsert: true }
        )
    } else {
        await logCol.findOneAndUpdate({ startDate, isWorker: true }, { $set: { lastDate, runMinutes, env: envVars.env } }, { upsert: true })
    }
    runMinutes++
}

setInterval(log, 60000)
