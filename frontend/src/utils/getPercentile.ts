import getStats from "./getStats";

export default async function getPercentile(stat: string, player: string, season: string){
    if(player === undefined) return "0%"

    const data = await getStats("custom", season, stat);

    let stats = data.map((o : {player: string, [key: string] : string}) => new Object({ player: o.player, stat: Number(o[stat]) }))
    stats = stats.filter((item : { player: string, stat: number }) => item.stat > 0)

    const playerV = stats.filter((item : { player: string, stat: number }) => item.player === player)[0]
    if(playerV === undefined) return "0%"
    const below = stats.filter((item : { player: string, stat: number }) => item.stat < playerV.stat)


    let percentile : number = Number((below.length / stats.length) * 100)

    if (Math.floor(percentile) === 100) percentile = 99
    else if (Math.floor(percentile) === 0) percentile = 1

    return `calc(${Math.round(percentile)}% - 30px)`
}