import axios from 'axios';

const authCallback = async (req, res) => {
  console.log('被call---------');
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
    .then((result) => {
      console.log(result.data.access_token);
      res.send('you are authorized ' + result.data.access_token);
    })
    .catch((err) => {
      console.log(err);
    });
};
export default authCallback;
