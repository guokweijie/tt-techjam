// pages/api/tiktok-auth.tsx
import axios from 'axios';

export default async function handler(req: { body: { code: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) {
  const { code } = req.body;

  const CLIENT_KEY = 'sbawgbcd6kwg0yhkmk';
  const CLIENT_SECRET = '96KAwl0jqdzjMecGLViEaLPHtQfZFk8C';
  const REDIRECT_URI = 'http://localhost:3000/callback';

  try {
    const tokenResponse = await axios.post('https://open-api.tiktok.com/oauth/access_token/', {
      client_key: CLIENT_KEY,
      client_secret: CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI
    });

    const accessToken = tokenResponse.data.data.access_token;

    const userInfoResponse = await axios.get('https://open-api.tiktok.com/oauth/userinfo/', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    res.status(200).json(userInfoResponse.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user info' });
  }
}
