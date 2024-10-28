export default async function issueChannelAccessToken() {
    const response = await fetch("https://api.line.me/oauth2/v3/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.NEXT_PUBLIC_LINE_CHANNEL_ID!,
        client_secret: process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET!,
      }),
    });
  
    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `Failed to issue access token: ${response.statusText} ${text}`
      );
    }
  
    const body = (await response.json()) as {
      access_token: string;
      expires_in: number;
    };
    return body;
  }