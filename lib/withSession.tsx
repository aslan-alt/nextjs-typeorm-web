// export default withIronSessionApiRoute(
//     async function loginRoute(req, res) {
//         // get user from database then:
//         req.session.user = {
//             id: 230,
//             admin: true,
//         };
//         await req.session.save();
//         res.send({ ok: true });
//     },
//     {
//         cookieName: "myapp_cookiename",
//         password: "6f85853e-6922-432e-8022-9be8bceb521d",
//         // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
//         cookieOptions: {
//             secure: process.env.NODE_ENV === "production",
//         },
//     },
// );

export const ironOptions =  {
    cookieName: "myapp_cookiename",
    password: "6f85853e-6922-432e-8022-9be8bceb521d",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
}