import styles from "./Editor.module.css";
import { useState, useEffect } from "react";
import SongSelect from "./SongSelect";

export default function Editor() {
    const songOptions = [
        { value: "a", label: "Song A" },
        { value: "b", label: "Song B" },
    ];

    function handleChangeSong(selectedSong) {
        console.log("handleChangeSong in Editor " + selectedSong);
    }

    return (
        <div className={styles.Editor}>
            <canvas width={640} height={640} id={styles.cover}></canvas>
            <div className={styles.settings}>
                <SongSelect
                    options={songOptions}
                    handleChangeSong={handleChangeSong}
                ></SongSelect>
                <div className="thing">bla</div>
                <div className="thing">bla</div>
            </div>
        </div>
    );
}
