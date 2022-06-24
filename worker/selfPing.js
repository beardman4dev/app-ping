"use strict"

const axios = require("axios")

const selfPingUrl = process.env.SELF_PING_URL || null

if (selfPingUrl) {
    selfPing()
}

async function selfPing() {
    try {
        await axios.get(selfPingUrl)
        setTimeout(selfPing, 300000)
    } catch (e) {
        console.log(`Error ping: ${e.status} - ${e.message}`)
    }
}
