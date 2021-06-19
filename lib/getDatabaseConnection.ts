import { createConnection, Connection, getConnectionManager } from "typeorm";
import 'reflect-metadata'
import { Post } from "src/entity/Post";
import config from '../ormconfig.json'
import { User } from "src/entity/User";
import { Comment } from "src/entity/Comment";

const create = async () => {
    //@ts-ignore
    return createConnection({
        ...config,
        host: process.env.NODE_ENV === 'production' ? 'host.docker.internal' : 'localhost',
        database: process.env.NODE_ENV === 'production' ? 'production_blog' : 'development_blog',
        entities: [Post, User, Comment]
    })
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



