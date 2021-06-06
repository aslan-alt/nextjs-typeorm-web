import { GetServerSideProps, NextApiHandler } from "next";
import { withIronSession } from 'next-iron-session'

export function withSession(handler: NextApiHandler | GetServerSideProps) {
    console.log('process.env.SECRET--------')
    console.log(process.env.SECRET)
    return withIronSession(handler, {
        password: process.env.SECRET,
        cookieName: 'blog',
        cookieOptions: { secure: false }
    })
}