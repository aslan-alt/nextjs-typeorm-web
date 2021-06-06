import { NextApiHandler } from "next";
import { withIronSession } from 'next-iron-session'

export function withSession(handler: NextApiHandler) {
    return withIronSession(handler, {
        password: '4828a830-5b50-4ae8-b090-c6c967223d7b',
        cookieName: 'blog',
        cookieOptions: { secure: false }
    })
}