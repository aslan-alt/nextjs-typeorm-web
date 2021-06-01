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
    const current = manager.has('default') && manager.get('default')
    if (current) {
        await current.close()
    }
    return create()
})()

export const getDatabaseConnection = () => {
    return connection
}



