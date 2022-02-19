import { useEffect, useState } from "react";

export default function SongSelect(props) {
    const [selectedSong, setSelectedSong] = useState(props.selectedSong);
    useEffect(() => {
        console.log(`song selected: ${props.selectedSong.value}`);
    }, [props.selectedSong]);

    return (
        <select
            name="songs"
            value={selectedSong}
            onChange={(e) => {
                props.handleChangeSong(e.target.value);
                setSelectedSong(e.target.value);
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
