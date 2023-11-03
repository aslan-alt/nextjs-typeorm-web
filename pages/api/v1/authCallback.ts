import axios from 'axios';
import {withIronSessionApiRoute} from 'iron-session/next';

const authCallback = async (req, res) => {
  axios
    .post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.AUTH_GITHUB_ID,
        client_secret: process.env.AUTH_GITHUB_SECRET,
        code: req.query.code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    )
    .then(async (result) => {
      const userResponse = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${result.data.access_token}`,
        },
      });
      console.log('userResponse--------');
      console.log(userResponse.data);
      res.json('chengg');
    })
    .catch((err) => {
      console.log(err);
    });
};
export default withIronSessionApiRoute(authCallback, {
  cookieName: 'myapp_cookiename',
  password: '6f85853e-6922-432e-8022-9be8bceb521d',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
});
