export default async function getData(table: string, season: string, player: string) {
    const response = await fetch(`https://hexabackend.onrender.com/data?table=${table}&season=${season}&player=${player}`)
    const data = response.json()
    return data
}