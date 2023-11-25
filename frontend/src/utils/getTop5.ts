export default function getTop5(data: object){
    if(!data) return []

    let sumArray = []
    for (const [key, value] of Object.entries(data)) {
        if(key === "player") continue
        else{
            sumArray.push({stat: key, value: value as number})
        }
    }

    sumArray = sumArray.sort(function (a, b) {
        return b.value - a.value;
    }).slice(0, 5);

    return sumArray
}