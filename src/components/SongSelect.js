import { useState, useEffect } from "react";

export default function SongSelect(props) {
    const [selectedSong, setSelectedSong] = useState("a");

    return (
        <select
            name="songs"
            value={selectedSong}
            onChange={(e) => {
                setSelectedSong(e.target.value);
                props.handleChangeSong(selectedSong);
            }}
        >
            {props.options.map((opt) => (
                <option value={opt.value} key={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
}
