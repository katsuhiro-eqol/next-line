"use client"

export default function SendMessage () {
    const submit = async () => {

        try {
            const response = await fetch("/api/cron", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              //body: JSON.stringify({ input: userInput, character: character, fewShot: fewShot, previousData: previousData, sca: scaList[character] }),
              body: JSON.stringify({ key: "cronToken"}),
            });
    
            const data = await response.json();
            console.log(data)

        } catch (error) {

        }
    }

    return (
        <>
            <button onClick={() => submit()}>cron api</button>
        </>
    )
}

