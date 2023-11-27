import styles from "@/styles/AboutUs/Main.module.css";
import Staff from "../LandingPage/Staff";

export default function Main(){
    return(
        <div className={styles['main-wrapper']}>
            <div className={styles['main-heading']}>
                <h2>About Us</h2>
                <h1>Our mission: Unite Minecraft players, build amazing worlds, and have a blast while playing the block game.</h1>
                <p>The Hexacomb SMP was created in January of 2021 as a means to an end for a player-base of a now-revived Minecraft multiplayer experience. Having been condemned to isolation by the pandemic, gamers sought communities like Hexacomb, a community with many different facets and ideas, combined into a single cohesive group that is like a family. NevQ, the founder, had these ideals and goals in mind when creating Hexacomb, and they carry on to this day.</p>
            </div>
            <Staff />
            <div className={styles['main-heading']}>
                <h2>Current Season</h2>
                <h1>Thrive in group, complete all the objectives and unleash the ages upon us.</h1>
                <p>Season 4 of Hexacomb began on October 1st 2023. In this new season we will try and slow down the progression of the server by advancing through different ages on the server. In order to advance through the Ages we will have to meet goals as a community to open up the world border and the dimensions in Minecraft.</p>
            </div>
            <div className={styles['main-heading']}>
                <h2>Server Information</h2>
                <div className={styles['server-info']}>
                    <div className={styles['info-wrapper']}>
                        <h1>Datapacks</h1>
                        <ul>
                            <li>AFK Display</li>
                            <li>Anti-Enderman Grief</li>
                            <li>Bat Membranes</li>
                            <li>Custom Nether Portals</li>
                            <li>Custom Roleplay Data</li>
                            <li>Fast Leaf Decay</li>
                            <li>HuskSand</li>
                            <li>Inaccessible Nether Roof</li>
                            <li>Mob Heads</li>
                            <li>Player Heads</li>
                            <li>Sandstone Dyeing</li>
                            <li>Silence Mobs</li>
                            <li>Stillagers</li>
                            <li>Track Statistics</li>
                            <li>Wandering Trades (miniblocks)</li>
                        </ul>
                    </div>
                    <div className={styles['info-wrapper']}>
                        <h1>Mods</h1>
                        <ul>
                            <li>Anti X-Ray</li>
                            <li>Armor Stand Editor</li>
                            <li>Audio Player</li>
                            <li>BlueMap</li>
                            <li>Carpet</li>
                            <li>Discord Link</li>
                            <li>Incendium</li>
                            <li>Krypton</li>
                            <li>Ledger</li>
                            <li>Lithium</li>
                            <li>No Chat Reports</li>
                            <li>Starlight</li>
                            <li>Simple Voice Chat</li>
                            <li>Terralith</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}