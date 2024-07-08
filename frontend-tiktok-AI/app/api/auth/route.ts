// // pages/api/tiktok-auth.js
// import axios from "axios";

// export default async function handler(
//   req: { body: { code: any } },
//   res: {
//     status: (arg0: number) => {
//       (): any;
//       new (): any;
//       json: { (arg0: { error: string }): void; new (): any };
//     };
//   },
// ) {
//   const { code } = req.body;

//   const CLIENT_KEY = "sbawgbcd6kwg0yhkmk";
//   const CLIENT_SECRET = "96KAwl0jqdzjMecGLViEaLPHtQfZFk8C";
//   const REDIRECT_URI = "https://localhost:3000";

//   try {
//     const tokenResponse = await axios.post(
//       "https://open-api.tiktok.com/oauth/access_token/",
//       {
//         client_key: CLIENT_KEY,
//         client_secret: CLIENT_SECRET,
//         code,
//         grant_type: "authorization_code",
//         redirect_uri: REDIRECT_URI,
//       },
//     );

//     const accessToken = tokenResponse.data.data.access_token;

//     const userInfoResponse = await axios.get(
//       "https://open-api.tiktok.com/oauth/userinfo/",
//       {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       },
//     );

//     res.status(200).json(userInfoResponse.data);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching user info" });
//   }
// }


import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const csrfState = Math.random().toString(36).substring(2); // Generate a unique CSRF state token

  const CLIENT_KEY = process.env.CLIENT_KEY; // Ensure this is set in your environment variables
  const SERVER_ENDPOINT_REDIRECT = process.env.REDIRECT_URI; // Your redirect URI

  const url = new URL('https://www.tiktok.com/v2/auth/authorize/');
  url.searchParams.append('client_key', CLIENT_KEY!);
  url.searchParams.append('response_type', 'code');
  url.searchParams.append('scope', 'user.info.basic');
  url.searchParams.append('redirect_uri', SERVER_ENDPOINT_REDIRECT!);
  url.searchParams.append('state', csrfState);

  console.log(CLIENT_KEY);
  console.log(url.toString());

  const response = NextResponse.redirect(url.toString());

  response.cookies.set('csrfState', csrfState, {
    maxAge: 60000, // 1 minute
  });

  return response;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { code } = body;

  const params = new URLSearchParams();
  params.append('client_key', process.env.CLIENT_KEY!);
  params.append('client_secret', process.env.CLIENT_SECRET!);
  params.append('code', code);
  params.append('grant_type', 'authorization_code');
  params.append('redirect_uri', process.env.REDIRECT_URI!);

  try {
    const response = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch TikTok token' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch TikTok token' }, { status: 500 });
  }
}

