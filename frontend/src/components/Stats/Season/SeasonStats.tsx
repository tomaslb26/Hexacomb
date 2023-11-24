"use client";

import { useEffect, useState } from "react";
import getStats from "@/utils/getStats";
import styles from "@/styles/Stats/Season/Main.module.css";
import BarChart from "./BarChart";
import getTop10 from "@/utils/getTop10";
import parseData from "@/utils/parseData";
import getData from "@/utils/getData";
import getColumns from "@/utils/getColumns";
import {createContext} from "react";
import Dropdown from "@/components/Reusable/Dropdown";
import LoadingBarChart from "./LoadingBarChart";

export const StatsContext = createContext<{
    setSelected: React.Dispatch<React.SetStateAction<{
        mined: string,
        general: string,
        killed: string,
        killedBy: string,
    }>>
} | null>(null);

export default function SeasonStats() {

    const [stats, setStats] = useState<{
        mined: { player: string, value: number }[],
        general: { player: string, value: number }[],
        killed: { player: string, value: number }[],
        killedBy: { player: string, value: number }[],
    }>({
        mined: [],
        general: [],
        killed: [],
        killedBy: [],
    })

    const [selected, setSelected] = useState<{
        mined: string,
        general: string,
        killed: string,
        killedBy: string,
    }>({
        mined: "stone",
        general: "Play Time",
        killed: "zombie",
        killedBy: "zombie",
    })

    const [columns, setColumns] = useState<{
        mined: string[],
        general: string[],
        killed: string[],
        killedBy: string[],
    }>({
        mined: [],
        general: [],
        killed: [],
        killedBy: [],
    })

    const [isLoading, setIsLoading] = useState<{
        mined: boolean,
        general: boolean,
        killed: boolean,
        killedBy: boolean,
    }>({
        mined: true,
        general: true,
        killed: true,
        killedBy: true,
    })
 
    const [season, setSeason] = useState<string>("4");


    useEffect(() => {
        (async () => {

            let update: boolean = false;
            let columnsData : string[] = [];
            let killedColumnsData : string[] = [];
            let killedByColumnsData : string[] = [];
            let generalColumnsData : string[] = [];
            if(columns.mined.length === 0){
                columnsData = getColumns(await getData("mined", "4", "Ferrno"));
                update = true;
            }

            if(columns.killed.length === 0){
                killedColumnsData = getColumns(await getData("killed", "4", "Ferrno"));
                update = true;
            }

            if(columns.killedBy.length === 0){
                killedByColumnsData = getColumns(await getData("killed_by", "4", "Ferrno"));
                update = true;
            }

            if(columns.general.length === 0){
                generalColumnsData = getColumns(await getData("custom", "4", "Ferrno"));
                update = true;
            }


            if(update){
                setColumns((prev) => {
                    return {
                        ...prev,
                        ...(columnsData.length > 0 ? {mined: columnsData} : {}),
                        ...(killedColumnsData.length > 0 ? {killed: killedColumnsData} : {}),
                        ...(killedByColumnsData.length > 0 ? {killedBy: killedByColumnsData} : {}),
                        ...(generalColumnsData.length > 0 ? {general: generalColumnsData} : {}),
                    }
                })
            }
        })()
    }, [selected, season])


    useEffect(() => {
        (async () => {

            setIsLoading((prev) => {
                return {
                    ...prev,
                    mined: true,
                }
            })

            const data = parseData(await getTop10("mined", season, selected.mined), selected.mined);
            setStats((prev) => {
                return {
                    ...prev,
                    mined: data,
                }
            })

            setIsLoading((prev) => {
                return {
                    ...prev,
                    mined: false,
                }
            })
        })()
    }, [selected.mined, season])


    useEffect(() => {
        (async () => {
            setIsLoading((prev) => {
                return {
                    ...prev,
                    general: true,
                }
            })

            const data = parseData(await getTop10("custom", season, selected.general), selected.general);
            setStats((prev) => {
                return {
                    ...prev,
                    general: data,
                }
            })

            setIsLoading((prev) => {
                return {
                    ...prev,
                    general: false,
                }
            })
        })()
    }, [selected.general, season])

    useEffect(() => {
        (async () => {

            setIsLoading((prev) => {
                return {
                    ...prev,
                    killed: true,
                }
            })

            const data = parseData(await getTop10("killed", season, selected.killed), selected.killed);
            setStats((prev) => {
                return {
                    ...prev,
                    killed: data,
                }
            })

            setIsLoading((prev) => {
                return {
                    ...prev,
                    killed: false,
                }
            })
        })()
    }, [selected.killed, season])

    useEffect(() => {
        (async () => {
            setIsLoading((prev) => {
                return {
                    ...prev,
                    killedBy: true,
                }
            })

            const data = parseData(await getTop10("killed_by", season, selected.killedBy), selected.killedBy);
            setStats((prev) => {
                return {
                    ...prev,
                    killedBy: data,
                }
            })

            setIsLoading((prev) => {
                return {
                    ...prev,
                    killedBy: false,
                }
            })
        })()
    }, [selected.killedBy, season])



    return (
        <div className={styles['main-container']}>
            <Dropdown options={["Season 1", "Season 2", "Season 3", "Season 4"]} selected={`Season ${season}`} setSelected={(value: string) => {
                setSeason(value.split("Season ")[1]);
            }} isBlock={false} />
            <div className={styles['main-season']}>
                <StatsContext.Provider value={{setSelected}}>
                    {isLoading.mined ?
                    <LoadingBarChart />
                    :
                    <BarChart title="Mined" columns={columns.mined} selected={selected.mined} data={stats.mined}  />
                    }
                    {isLoading.general ?
                    <LoadingBarChart />
                    :
                    <BarChart title="General" photo={false} columns={columns.general} selected={selected.general} data={stats.general}  />
                    }
                    {isLoading.killed ?
                    <LoadingBarChart />
                    :
                    <BarChart title="Killed" columns={columns.killed} selected={selected.killed} data={stats.killed}  />
                    }
                    {isLoading.killedBy ?
                    <LoadingBarChart />
                    :
                    <BarChart title="Killed By" columns={columns.killedBy} selected={selected.killedBy} data={stats.killedBy}  />
                    }
                </StatsContext.Provider>
            </div>
        </div>
    )
}