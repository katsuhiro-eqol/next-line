export default async function issueChannelAccessToken() {
    try {
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

            const jsonData = await response.json();
            if (jsonData){
            return jsonData
            } else {
                return {access_token:""}
            }
    } catch(error) {
        console.error('Error fetching data:', error);
        return {access_token:""}
    }
  }