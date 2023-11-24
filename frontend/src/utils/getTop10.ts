export default async function getTop10(table: string, season: string, item: string){
    const response = await fetch(`https://hexabackend.onrender.com/db?table=${table}&season=${season}&stat=${item}&limit=10`)
    const data = response.json();
    return data;
}