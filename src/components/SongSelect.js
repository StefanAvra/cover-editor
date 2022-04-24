import styles from "./CustomSelect.module.css";
import { useState } from "react";

export default function SongSelect(props) {
    const [selectedSong, setSelectedSong] = useState(props.selectedSong);

    let iconSvg = (
        <svg
            id="Ebene_1"
            data-name="Ebene 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50.78 46.57"
            style={{
                fill: getComputedStyle(document.body).getPropertyValue(
                    "--bg-color"
                ),
                height: "2em",
                position: "absolute",
                right: "8px",
                pointerEvents: "none",
            }}
        >
            <path d="M50.27,10.64a14.09,14.09,0,0,0-1.72-4,13.47,13.47,0,0,0-5.67-5A18.32,18.32,0,0,0,34.79,0c-6,0-12.65,2.28-18.74,6.43A39.77,39.77,0,0,0,2.42,21.86,23.58,23.58,0,0,0,0,31.46a16.86,16.86,0,0,0,.51,4.43,14,14,0,0,0,1.72,4,13.56,13.56,0,0,0,5.67,5A18.49,18.49,0,0,0,16,46.55c6,0,12.65-2.28,18.74-6.43A39.77,39.77,0,0,0,48.36,24.67a23.58,23.58,0,0,0,2.42-9.6A16.91,16.91,0,0,0,50.27,10.64Zm-46,20.89a19.42,19.42,0,0,1,2-7.86A35.45,35.45,0,0,1,18.44,9.92c5.39-3.67,11.2-5.69,16.35-5.69A14.35,14.35,0,0,1,41,5.51,9.41,9.41,0,0,1,45,9a9.61,9.61,0,0,1,1.19,2.76A12.12,12.12,0,0,1,46.53,15a19.42,19.42,0,0,1-2,7.86A35.37,35.37,0,0,1,32.34,36.61C27,40.28,21.14,42.3,16,42.3A14.35,14.35,0,0,1,9.74,41a9.41,9.41,0,0,1-3.93-3.44,10.2,10.2,0,0,1-1.19-2.76A12.12,12.12,0,0,1,4.25,31.53Z" />
            <polygon points="15.8 19.34 21.38 27.7 35.26 19.31 43.27 19.29 19.61 34.06 10.19 19.35 15.8 19.34" />
        </svg>
    );

    return (
        <div className={styles.CustomSelect}>
            <label htmlFor="songs">Song</label>
            <div className={styles.selectContainer}>
                <select
                    name="songs"
                    value={selectedSong}
                    onChange={(e) => {
                        props.handleChange(e.target.value);
                        setSelectedSong(e.target.value);
                    }}
                >
                    {props.options.map((opt) => (
                        <option value={opt.value} key={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                {iconSvg}
            </div>
        </div>
    );
}
