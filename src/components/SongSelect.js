import styles from "./CustomSelect.module.css";
import { useState } from "react";

export default function SongSelect(props) {
    const [selectedSong, setSelectedSong] = useState(props.selectedSong);

    return (
        <div className={styles.CustomSelect}>
            <label htmlFor="songs">Song</label>
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
        </div>
    );
}
