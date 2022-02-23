export default function RangeSlider(props) {
    return (
        <div>
            <input
                type="range"
                id={props.effect}
                min={props.range.min}
                max={props.range.max}
                value={props.value}
                onChange={(e) => {
                    props.handleChange(e);
                }}
            ></input>
            <label htmlFor={props.effect}>
                {props.effect[0].toUpperCase() + props.effect.slice(1)}
            </label>
        </div>
    );
}
