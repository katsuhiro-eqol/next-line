type Event = {title:string,start:string, end:string}

const convToNum = (timeString:string | null) => {
    if (timeString){
        const date = new Date(timeString)
        const num = date.getTime()
        if (num){
            return num
        } else {
            return 0
        }
    } else {
        return 0
    }
}
//予約の空きがあるかどうか判定する関数。
export function judgeAvailability(events:Event[], day:string, openning:string, closing:string, time:number){
    const open = convToNum(day + "T" +openning + ":00")
    const close = convToNum(day + "T" +closing + ":00")
    const n = events.length
    let maxDiff = 0

    if (n<1){
        return true
    } else if (convToNum(events[0]["start"]) !== 0 && convToNum(events[0]["start"]) - open >= time){
        return true
    } else if (convToNum(events[n-1]["end"]) !== 0 && close - convToNum(events[n-1]["end"]) >= time){
        return true
    } else {
        for (let i = 0; i < n-1; i++){
            if (convToNum(events[i+1]["start"]) !== 0 && convToNum(events[i]["end"]) !== 0){
                const diff = convToNum(events[i+1]["start"]) - convToNum(events[i]["end"])
                if (diff > maxDiff) {
                    maxDiff = diff
                }
            }
        }
        console.log("maxDiff", maxDiff)
        if (maxDiff >= time){
            return true
        } else {
            return false
        }
    }
}


export function judgeCanReserve(events:Event[], start:string, day:string, openning:string, closing:string, time:number){
    const open = convToNum(day + "T" +openning + ":00")
    const close = convToNum(day + "T" +closing + ":00")
    const eventStart = convToNum(day + "T" + start + ":00")
    console.log("open", open)
    console.log("close", close)
    console.log("start", eventStart)
    const n = events.length

    if (n==0){
        if (eventStart >= open && close - eventStart>=time){
            return true
        } else {
            false
        }
    } else {
        let insertPosition = -1
        for (let i = 0; i < n; i++){
            if (convToNum(events[i]["start"]) !== 0 &&  eventStart-convToNum(events[i]["start"]) > 0){
                insertPosition = i
            }
        }
        console.log(insertPosition)
        if (insertPosition == -1){
            if (convToNum(events[0]["start"]) !== 0 && eventStart >= open && convToNum(events[0]["start"])-eventStart>=time){
                return true
            } else {
                return false
            }
        } else if (insertPosition == n-1){
            if (close-eventStart >= time){
                return true
            } else {
                return false
            }
        } else {
            if (convToNum(events[insertPosition]["end"]) !== 0 && convToNum(events[insertPosition+1]["start"]) !== 0 && eventStart - convToNum(events[insertPosition]["end"])>=0 && convToNum(events[insertPosition+1]["start"])-eventStart>=time){
                return true
            } else {
                return false
            }
        }
    }
}

export function setNewEvents(events:Event[], data:any){
    const eventStart = convToNum(data["start"])
    const n = events.length
    const newEvent = {title:data["user"], start:data["start"], end:data["end"]}
    let newEvents = []
    let insertPosition = -1
    if (n==0){
        newEvents.push(newEvent)
        return newEvents
    } else {
        for (let i = 0; i < n; i++){
            if (eventStart !== 0 && convToNum(events[i]["start"]) !== 0 && eventStart-convToNum(events[i]["start"]) > 0){
                insertPosition = i
            }
        }
        console.log(insertPosition)
        newEvents = events
        newEvents.splice(insertPosition+1,0,newEvent)
        return newEvents
    }
}
