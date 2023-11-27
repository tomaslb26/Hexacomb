"use client";

import Dropdown from "@/components/Reusable/Dropdown";
import styles from "@/styles/Stats/Players/Main.module.css";
import getStats from "@/utils/getStats";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import getData from "@/utils/getData";
import getTotalInObject from "@/utils/getTotalInObject";
import getTop5 from "@/utils/getTop5";
import shortenNumber from "@/utils/shortenNumber";
import getPercentile from "@/utils/getPercentile";

function PlayerImage(props: {player: string}) {
    const {player} = props;

    const defaultImage = "/images/Heads/blond996.jpg"; // The path to your default image in the public folder

    const handleError = (e : React.SyntheticEvent<HTMLImageElement, Event>) => {
        if ((e.target as HTMLImageElement).src !== defaultImage) {
            // Prevents infinite loop in case the default image is also missing
            e.currentTarget.onerror = null; // Remove the error handler to prevent it from being called again
            e.currentTarget.src = defaultImage; // Set to the default image
          }
    };

    return (
        <img 
            src={`/images/Heads/${player}.jpg`} 
            alt={player}
            onError={handleError}
        />
    );
}

function PercentileContainer(props: {
    stat: string,
    player: string,
    season: string,
}) {
    const {player, stat, season} = props;
    const [height, setHeight] = useState<string>("");

    useEffect(() => {
        (async () => {
            setHeight(await getPercentile(stat,player, season));
        })()
    }, [player, stat, season])

    return (
        <div className={styles['percentile-container']}>
            <div className={styles['bar']} />
            <div style={{ height: height }} className={styles['second-bar']} />
            <p>{stat}</p>
        </div>
    )
}


export default function PlayersStats(){

    const [season, setSeason] = useState<string | undefined>(undefined);
    const [players, setPlayers] = useState<string[]>([]);
    const [player, setPlayer] = useState<string | undefined>(undefined);
    const [customData, setCustomData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingSeason, setIsLoadingSeason] = useState<boolean>(true);
    const [data, setData] = useState<{
        custom: {
            [key: string]: string
        },
        killed: object,
        mined: object,
        crafted: object,
        dropped: object,
        killed_by: object,
    }>({
        custom: {},
        killed: {},
        mined: {},
        crafted: {},
        dropped: {},
        killed_by: {},
    });

    useEffect(() => {
        if(season){
            setIsLoadingSeason(true);
            setPlayer(undefined);
            (async () => {
                const data = await getStats("custom", season, "Play Time");
                setCustomData(data);
                setPlayers(data.map((player: any) => String(player.player)).sort())
            })()
            setIsLoadingSeason(false);
        }
    }, [season])

    useEffect(() => {
        if(season && player){
            setIsLoading(true);
            (async () => {
                setData({
                    custom: (await getData("custom", season, player))[0],
                    killed: (await getData("killed", season, player))[0],
                    mined: (await getData("mined", season, player))[0],
                    crafted: (await getData("crafted", season, player))[0],
                    dropped: (await getData("dropped", season, player))[0],
                    killed_by: (await getData("killed_by", season, player))[0],
                })
            })()

            setIsLoading(false);
        }

    }, [player, season])


    useEffect(() => {
        console.log(data)

    }, [data])

    return(
        <div className={styles['players-main']}>
            <Dropdown options={["Season 1", "Season 2", "Season 3", "Season 4"]} selected={season === undefined ? "Select a season" : `Season ${season}`}
            isBlock={false} setSelected={(value: string) => setSeason(value.split("Season ")[1])} input={false} />
            <div className={styles['dashboard']}>
                <div className={`${styles['sidepanel']} ${isLoadingSeason ? styles['skeleton'] : ""}`}>
                    {players.length > 0 && <Dropdown options={players} selected={player === undefined ? "Select a player" : player}
                    isBlock={false} input={true} setSelected={(value: string) => setPlayer(value)} skeleton={isLoadingSeason} isPlayer />}
                    {player && data.custom && data.mined && data.crafted && data.dropped &&
                    <div className={`${styles['sidepanel-container']} ${isLoading ? styles['skeleton'] : ""}`}>
                        {player && <PlayerImage player={player} />}
                        <div className="divider" />
                        <p>Play Time: <span>{(Number(data.custom["Play Time"]) / 20 / 60 / 1440).toString().slice(0, 4) + "d"}</span></p>
                        <div className="divider" />
                        <p>Players Killed: <span>{data.custom["Player Kills"]}</span></p>
                        <div className="divider" />
                        <p>Mobs Killed: <span>{data.custom["Mob Kills"]}</span></p>
                        <div className="divider" />
                        <p>Deaths: <span>{data.custom["Deaths"]}</span></p>
                        <div className="divider" />
                        <p>Traded: <span>{data.custom["Traded With Villager"]}</span></p>
                        <div className="divider" />
                        <p>Mined: <span>{getTotalInObject(data.mined)}</span></p>
                        <div className="divider" />
                        <p>Crafted: <span>{getTotalInObject(data.crafted)}</span></p>
                        <div className="divider" />
                        <p>Dropped: <span>{getTotalInObject(data.dropped)}</span></p>
                    </div>
                    }
                </div>
                {player && season && !isLoading ?
                <div className={`${styles['side-section']} ${isLoading ? styles['skeleton'] : ""}`}>
                    <div className={styles['top-panel']}>
                        <div className={styles['stat-container']}>
                            <h6>Mined</h6>
                            {getTop5(data.mined).map((item : {stat: string, value: number}, index) => {
                                return(
                                    <div className={styles['item']} key={index}>
                                        <Image src={"/images/Blocks/" + item.stat.toLocaleLowerCase().replaceAll(" ", "_") + ".png"} alt="" width={32} height={32} />
                                        <p>{item.stat} <span style={{color: "#f0ad2c"}}>{shortenNumber(item.value)}</span></p>
                                    </div>
                            )})}
                        </div>
                        <div className={styles['stat-container']}>
                            <h6>Crafted</h6>
                            {getTop5(data.crafted).map((item : {stat: string, value: number}, index) => {
                                return(
                                    <div className={styles['item']} key={index}>
                                        <Image src={"/images/Blocks/" + item.stat.toLocaleLowerCase().replaceAll(" ", "_") + ".png"} alt="" width={32} height={32} />
                                        <p>{item.stat} <span style={{color: "#f0ad2c"}}>{shortenNumber(item.value)}</span></p>
                                    </div>
                            )})}
                        </div>
                        <div className={styles['stat-container']}>
                            <h6>Killed</h6>
                            {getTop5(data.killed).map((item : {stat: string, value: number}, index) => {
                                return(
                                    <div className={styles['item']} key={index}>
                                        <Image src={"/images/Blocks/" + item.stat.toLocaleLowerCase().replaceAll(" ", "_") + ".png"} alt="" width={32} height={32} />
                                        <p>{item.stat} <span style={{color: "#f0ad2c"}}>{shortenNumber(item.value)}</span></p>
                                    </div>
                            )})}
                        </div>
                        <div className={styles['stat-container']}>
                            <h6>Killed By</h6>
                            {getTop5(data.killed_by).map((item : {stat: string, value: number}, index) => {
                                return(
                                    <div className={styles['item']} key={index}>
                                        <Image src={"/images/Blocks/" + item.stat.toLocaleLowerCase().replaceAll(" ", "_") + ".png"} alt="" width={32} height={32} />
                                        <p>{item.stat} <span style={{color: "#f0ad2c"}}>{shortenNumber(item.value)}</span></p>
                                    </div>
                            )})}
                        </div>
                    </div>
                    <div className={styles['bottom-panel']}>
                        <PercentileContainer stat="Play Time" player={player} season={season} />
                        <PercentileContainer stat="Bell Ring" player={player} season={season} />
                        <PercentileContainer stat="Damage Dealt" player={player} season={season} />
                        <PercentileContainer stat="Damage Taken" player={player} season={season} />
                        <PercentileContainer stat="Deaths" player={player} season={season} />
                        <PercentileContainer stat="Mob Kills" player={player} season={season} />
                        <PercentileContainer stat="Sleep In Bed" player={player} season={season} />
                        <PercentileContainer stat="Walk One Cm" player={player} season={season} />
                    </div>
                </div>
                :
                <div className={`${styles['side-section']} ${styles['skeleton']}`}>
                </div>
                }
            </div>
        </div>
    )
}