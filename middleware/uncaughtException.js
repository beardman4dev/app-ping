"use strict"

process.on("uncaughtException", (error, source) => {
    console.log("uncaughtException")
})
