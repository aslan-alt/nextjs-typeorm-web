import { NextApiHandler } from 'next'
import { withIronSessionApiRoute } from "iron-session/next";
import {ironOptions} from "../../lib/withSession";
import {getDatabaseConnection} from "../../lib/getDatabaseConnection";
import {Comment} from "../../src/entity/Comment";
import deepClone from "../../lib/deepClone";
import { UAParser } from 'ua-parser-js';

const GetAllComments: NextApiHandler = async (req, res) => {
    const ua = req.headers['user-agent'];
    const result = new UAParser(ua).getResult();
    const connection = await getDatabaseConnection();
    let found: Comment[] = []
    try {
        found = (await connection.manager.find(Comment)).sort(function (a, b) { return a.createdAt < b.createdAt ? 1 : -1 })
    } catch (e) {
    }
    await res.status(200).send({
        leaveMessageList: deepClone(found),
        result: deepClone(result)
    })
}
export default withIronSessionApiRoute(GetAllComments,ironOptions)