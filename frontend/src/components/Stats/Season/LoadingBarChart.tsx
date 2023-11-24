import Dropdown from "@/components/Reusable/Dropdown";
import styles from "@/styles/Stats/Season/BarChart.module.css";

export default function LoadingBarChart() {

    return(
        <div className={styles['bar-chart-container']}>
            <h2 className={styles['skeleton']}>{"Mined"}</h2>
            <Dropdown skeleton={true} options={[]} selected={""} isBlock={false} setSelected={(value: string) => {
                //
            }} />
            {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className={styles['bar-element']} style={{width: (100-(10*i))+"%"}} />
            ))}
        </div>
    )

}