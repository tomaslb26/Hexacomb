export default async function getStats(table : string, season : string, item : string) {
    const response = await fetch(`https://hexabackend.onrender.com/stats?table=${table}&season=${season}&stat=${item}`)
    const data = response.json()
    return data
}