"use strict"

const mongo = require("../connect/mongodb")
const settingsCol = mongo.col("common/core.settings")

const ID = "settings"
const settingsCache = {}

update()

module.exports.getSettings = () => Object.assign({}, settingsCache)

async function update() {
    const settings = await settingsCol.findOne({ _id: ID })
    if (settings) {
        Object.assign(settingsCache, settings)
    }
    setTimeout(update, 120000)
}

/** temporary setting */
module.exports.updateSlavePingSetting = async () => {
    const settings = (
        await settingsCol.findOneAndUpdate(
            { _id: ID },
            { $set: { slavePing: !settingsCache?.slavePing } },
            { upsert: true, returnOriginal: false }
        )
    )?.value
    if (settings) {
        Object.assign(settingsCache, settings)
    }
    return settingsCache
}
