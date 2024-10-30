export default async function issueNotifierToken(liffToken:string, accessToken:string) {
    try {
        const response = await fetch("https://api.line.me/message/v3/notifier/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                liffAccessToken: liffToken
              })
            });               

            const jsonData = await response.json();
            if (jsonData){
                return jsonData
            } else {
                return null
            }
    } catch(error) {
        console.error('Error fetching data:', error);
        return null
    }
  }