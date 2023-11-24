import styles from "@/styles/Stats/Season/BarChart.module.css";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import { useState, useRef, useEffect, useContext } from "react";
import {interpolateViridis} from "d3-scale-chromatic";
import { animated } from "@react-spring/web";
import Image from "next/image";
import React from "react";
import shortenNumber from "@/utils/shortenNumber";
import Dropdown from "@/components/Reusable/Dropdown";
import { StatsContext } from "./SeasonStats";
import LoadingBarChart from "./LoadingBarChart";

function SVGBar(props: {
    data: {
        player: string,
        value: number
    }[],
    time: boolean,
}){

    const {data} = props;

    const width = 500;
    const height = 400;
    const margin = { top: 0, bottom: 0, left: 0, right: 0 };

    // Then we'll create some bounds
    const [xMax, setXMax] = useState(width - margin.left - margin.right);
    const yMax = height - margin.top - margin.bottom;

    // We'll make some helpers to get at the data we want
    const y = (d : {player: string, value: number}) => d.player;
    const x = (d : {player: string, value: number}) => d.value* 100;

    // And then scale the graph by our data
    const yScale = scaleBand({
        range: [0, yMax],
        round: true,
        domain: data.map(y),
        padding: 0.9,
    });

    const xScale = scaleLinear({
    range: [0, xMax - 50],
    round: true,
    domain: [0, Math.max(...data.map(x))],
    });

    const compose = <T, U>(scale: (a: U) => T, accessor: (a: any) => U) => (data: any) => scale(accessor(data));
    const xPoint = compose(xScale, x);
    const yPoint = compose(yScale, y);
    
    const svgRef = useRef<SVGSVGElement>(null);
    const [svgWidth, setSvgWidth] = useState(0);

    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const normalize = (value: number): number => (value - minValue) / (maxValue - minValue);
    const getColor = (value: number): string => interpolateViridis(normalize(value));


    

    useEffect(() => {
        const observeSize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                setSvgWidth(entry.contentRect.width);
            }
        };
        
        const resizeObserver = new ResizeObserver(observeSize);
        
        if (svgRef.current) {
            resizeObserver.observe(svgRef.current);
        }

        // Clean up the observer on component unmount
        return () => {
            if (svgRef.current) {
                resizeObserver.unobserve(svgRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if(svgWidth !== xMax) setXMax(svgWidth);
    }, [svgWidth]);

    const numInputs = 10;
    const inputRefs = useRef<Array<HTMLOrSVGImageElement | null>>([]);
    inputRefs.current = Array.from({ length: numInputs }, () => null);

    return(
        <svg ref={svgRef} width={width} height={height}>
            {data.map((d, i) => {
                const barWidth = xPoint(d);
                if(d.value === 0) return null;
                return (
                    <Group key={`bar-${i}`}>
                        <Bar
                            x={0}
                            y={yPoint(d)}
                            width={barWidth}
                            height={yScale.bandwidth() + 15}
                            fill={getColor(d.value)} 
                            rx={4}
                            ry={4}
                        />
                        <image className={styles['head-image']} ref={(el) => inputRefs.current[i] = el}  onError={() => {
                            if(inputRefs.current[i]){
                                inputRefs.current[i]?.setAttribute("href", "/images/Heads/chunk5.jpg");
                            }
                        }} xlinkHref={`/images/Heads/${d.player}.jpg`} x={0} y={yPoint(d)} width={yScale.bandwidth() + 15} height={yScale.bandwidth() + 15} />
                        <text
                            x={25}  // 5 pixels to the left of the bar's start
                            y={Number(yPoint(d)) - 7}  // center the text in the middle of the bar
                            fontSize={12}
                            textAnchor="start"  // right-align the text
                            alignmentBaseline="middle"  // vertically align in the middle
                            fill="#fff"
                            fontFamily="Inter-Variable"
                            fontWeight="600"
                        >
                            {d.player}
                        </text>
                        <text
                            x={barWidth > yScale.bandwidth() + 15 ? barWidth + 5 : 25}  // 5 pixels to the left of the bar's start
                            y={Number(yPoint(d)) + ((yScale.bandwidth() + 15)/2)}  // center the text in the middle of the bar
                            fontSize={12}
                            textAnchor="start"  // right-align the text
                            alignmentBaseline="middle"  // vertically align in the middle
                            fill="#fff"
                            fontFamily="Inter-Variable"
                            fontWeight="400"
                        >
                            {props.time ? (Number(d.value) / 20 / 60 / 1440).toString().slice(0, 4) + "d" : shortenNumber(d.value)}
                        </text>
                    </Group>
                );
            })}
        </svg>
    )
}

export default function BarChart(props: {
    data: {
        player: string,
        value: number
    }[],
    columns: string[],
    selected: string,
    title: string,
    photo?: boolean,
}) {

    const stats = useContext(StatsContext);

    return(
        <div className={styles['bar-chart-container']}>
            <h2>{props.title}</h2>
            <Dropdown options={props.columns} selected={props.selected} isBlock={props.photo} setSelected={(value: string) => {
                stats?.setSelected((prev) => {
                    return {
                        ...prev,
                        [props.title.toLocaleLowerCase() === "killed by" ? "killedBy" : props.title.toLocaleLowerCase()]: value,
                    }
                })
            }} />
            <SVGBar time={props.title.toLocaleLowerCase() === "time"} data={props.data} />
        </div>
    )


}