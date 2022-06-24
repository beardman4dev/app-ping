"use strict"

const mongo = require("mongodb")

const clients = {}

module.exports.id = (id) => new mongo.ObjectID(id)

const getConnectionString = (clusterNameInUpperCase) => process.env[`MONGO_${clusterNameInUpperCase}`] || "mongodb://localhost"

async function getConnectedClient(connectionString) {
    const client = new mongo.MongoClient(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    return await client.connect()
}

module.exports.initSharedConnections = async (clustersNames) => {
    await Promise.all(
        clustersNames.map(async (clusterName) => {
            const clusterNameInUpperCase = clusterName.toUpperCase()

            if (!clients.hasOwnProperty(clusterNameInUpperCase)) {
                clients[clusterNameInUpperCase] = await getConnectedClient(getConnectionString(clusterNameInUpperCase))
            }
        })
    )
}

function getSharedConnection(clusterName) {
    const clusterNameInUpperCase = clusterName.toUpperCase()

    if (!clients.hasOwnProperty(clusterNameInUpperCase)) {
        throw new Error(`Client for mongo cluster "${clusterName}" was not initialized.`)
    }

    return clients[clusterNameInUpperCase]
}

module.exports.col = (collectionNameWithPath) => {
    const parts = collectionNameWithPath.split("/")
    const cluster = parts[0]
    const database = parts[1].split(".")[0]
    const collection = parts[1].split(".")[1]

    return getSharedConnection(cluster).db(database).collection(collection)
}

module.exports.executeInTransaction = async (clusterName, query) => {
    if (true) {
        await query()
        return
    }

    // const clusterNameInUpperCase = clusterName.toUpperCase()

    // const client = await getConnectedClient(getConnectionString(clusterNameInUpperCase))
    const client = getSharedConnection(clusterName)

    const session = client.startSession()

    try {
        // transaction can be aborted inside query via "await session.abortTransaction()"
        const transactionResults = await session.withTransaction(query)

        if (!transactionResults) {
            errors.throw(errors.byName.DATABASE_TRANSACTION_INTENTIONALLY_ABORTED, { clusterName, query })
        }
    } finally {
        await session.endSession()
        // await client.close()
    }
}
