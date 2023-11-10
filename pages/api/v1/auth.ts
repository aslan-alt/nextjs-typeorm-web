import {NextApiHandler} from 'next';

const auth: NextApiHandler = async (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.AUTH_GITHUB_ID}`);
};
export default auth;
