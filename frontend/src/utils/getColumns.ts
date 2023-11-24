export default function GetColumns(data : any[]) {
    try {
        var ret_data = Object.keys(data[0]).sort().filter((item) => item !== "player").sort()
        return ret_data
    }
    catch (e) {
        return []
    }
}