import { SetStateAction, useEffect } from "react";

function initServerData(serverIp: string, serverPort: string): Promise<number> {
    return fetch(`https://mcapi.us/server/status?ip=${serverIp}&port=${serverPort}`)
        .then(response => response.json())
        .then(data => {
            if(data.status === "success") return data.players.now;
        });
}

export default function useGetOnlinePlayers(setPlayers: React.Dispatch<SetStateAction<number | undefined>>): void {

    useEffect(() => {
        const interval = setInterval(() => {
            initServerData('170.205.25.132', '25565')
                .then(onlinePlayers => {
                    setPlayers(onlinePlayers);
                })
                .catch(error => {
                    console.error("Error fetching online players:", error);
                });
        }, 7000);

        // Clear the interval on component unmount
        return () => clearInterval(interval);
    }, []);

}

