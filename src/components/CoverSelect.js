import { useEffect, useState } from "react";

export default function CoverSelect(props) {
    const [cover, setCover] = useState("");
    const { options, handleChange } = props;

    useEffect(() => {
        // setCover(options[0]);
        // console.log("useEffect in coverselect");
        // handleChange(cover);
    }, [options]);

    return (
        <select
            name="cover images"
            value={cover}
            onChange={(e) => {
                handleChange(e.target.value);
                setCover(e.target.value);
            }}
        >
            {options.map((opt) => (
                <option value={opt} key={opt}>
                    {opt}
                </option>
            ))}
        </select>
    );
}
