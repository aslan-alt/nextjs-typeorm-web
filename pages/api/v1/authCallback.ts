import axios from 'axios';
import {withIronSessionApiRoute} from 'iron-session/next';
import {ironSessionConfig} from 'ironSessionConfig';

const authCallback = async (req, res) => {
  console.log('req.query.code-------');
  console.log(req.query.code);

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

      req.session.user = userResponse.data;
      await req.session.save();
      res.redirect('/chatBot');
    })
    .catch((err) => {
      console.log(err);
    });
};
export default withIronSessionApiRoute(authCallback, ironSessionConfig);
