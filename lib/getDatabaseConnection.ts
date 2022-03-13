import { createConnection, getConnectionManager } from "typeorm";
import 'reflect-metadata'
import { Post } from "src/entity/Post";
import config from '../ormconfig.json'
import { User } from "src/entity/User";
import { Comment } from "src/entity/Comment";

export const getDatabaseConnection =  async () => {
    const manager = getConnectionManager()
    const current = manager.has('default') && manager.get('default')
    if (current) {
        await current.close()
    }
    //@ts-ignore
    return  createConnection({
        ...config,
        host: process.env.NODE_ENV === 'production' ? 'localhost' : 'localhost',
        database: process.env.NODE_ENV === 'production' ? 'production_blog' : 'test_1',
        entities: [Post, User, Comment]
    })
}



