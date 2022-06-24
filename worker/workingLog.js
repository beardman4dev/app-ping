"use strict"

const envVars = require("../common/envVars")
const db = require("../connect/mongodb")

const logCol = db.col("common/test.workingLog")

const startDate = new Date()

log()

async function log() {
    const lastDate = new Date()
    const diffSeconds = parseInt((lastDate - startDate) / 1000)
    await logCol.findOneAndUpdate({ startDate }, { $set: { lastDate, diffSeconds, env: envVars.env } }, { upsert: true })

    setTimeout(log, 60000)
}
