"use strict"

const envVars = require("../common/envVars")
const db = require("../connect/mongodb")

const logCol = db.col("common/test.workingLog")

const startDate = new Date()

log()

async function log() {
    await logCol.findOneAndUpdate({ startDate }, { $set: { lastDate: new Date(), env: envVars.env } }, { upsert: true })

    setTimeout(log, 60000)
}
