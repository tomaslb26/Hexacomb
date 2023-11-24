export default function getTotalInObject(obj : any) {

    let sum = 0;
    for (const [key, value] of Object.entries(obj)) {
        if(key === "player") continue
        else{
            sum += value as number
        }
    }

    return sum
}