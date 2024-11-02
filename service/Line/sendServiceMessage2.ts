import {Message2} from "@/type/type"

export default async function sendServiceMessage2(accessToken:string, message:Message2) {
    try {
        const response = await fetch("https://api.line.me/message/v3/notifier/send?target=service", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(message)
            });               

            const jsonData = await response.json();
            if (jsonData){
            return jsonData
            } else {
               return {notificationToken:""}
            }
    } catch(error) {
        console.error('Error fetching data:', error);
        return {notificationToke:""}
    }
  }