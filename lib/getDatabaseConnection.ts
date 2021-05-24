import { createConnection, Connection, getConnectionManager } from "typeorm";

const connection: Promise<Connection> = (async () => {
    const manager = getConnectionManager()
    if (!manager.has('default')) {
        return createConnection()
    } else {
        const current = manager.get('default')
        if (current.isConnected) {
            return current
        } else {
            return createConnection()
        }
    }

})()

export const getDatabaseConnection = () => {
    return connection
}



