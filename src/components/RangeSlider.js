import { useState } from "react";

export default function RangeSlider(props) {
    const [value, setValue] = useState(
        props.defaultValue ? props.defaultValue : 50
    );

    return (
        <div>
            <input
                type="range"
                id={props.effect}
                min={props.range.min}
                max={props.range.max}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    props.handleChange(e);
                }}
            ></input>
            <label htmlFor={props.effect}>
                {props.effect[0].toUpperCase() + props.effect.slice(1)}
            </label>
        </div>
    );
}
