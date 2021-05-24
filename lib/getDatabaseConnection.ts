import { createConnection, Connection, getConnectionManager } from "typeorm";
import 'reflect-metadata'
import { Post } from "src/entity/Post";
import config from '../ormconfig.json'
import { User } from "src/entity/User";
import { Comment } from "src/entity/Comment";

const create = async () => {
    //@ts-ignore
    return createConnection({ ...config, entities: [Post, User, Comment] })
}

const connection: Promise<Connection> = (async () => {
    const manager = getConnectionManager()
    if (!manager.has('default')) {
        return create()
    } else {
        const current = manager.get('default')
        if (current.isConnected) {
            return current
        } else {
            return create()
        }
    }
})()

export const getDatabaseConnection = () => {
    return connection
}



