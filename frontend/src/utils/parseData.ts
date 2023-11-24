export default function parseData(data: [], stat: string){
    const formattedData = data.map((item: any) => {
        return {
            player: item.player,
            value: item[stat]
        }
    })
    return formattedData;
}