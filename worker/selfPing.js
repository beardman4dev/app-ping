"use strict"

const axios = require("axios")
const settingsCache = require("../common/settings")

const selfPingUrl = process.env.SELF_PING_URL || null

if (selfPingUrl) {
    selfPing()
}

async function selfPing() {
    try {
        if (settingsCache.getSettings()?.slavePing) {
            await axios.get(selfPingUrl)
            setTimeout(selfPing, 300000)
        } else {
            setTimeout(selfPing, 30000)
        }
    } catch (e) {
        console.log(`Error ping: ${e.status} - ${e.message}`)
    }
}
