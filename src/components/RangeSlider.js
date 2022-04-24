import styles from "./RangeSlider.module.css";

export default function RangeSlider(props) {
    return (
        <div className={styles.RangeSlider}>
            <label htmlFor={props.effect}>
                {props.effect[0].toUpperCase() + props.effect.slice(1)}
            </label>
            <div className={styles.sliderContainer}>
                <input
                    className={styles.slider}
                    type="range"
                    id={props.effect}
                    name={props.effect}
                    min={props.range.min}
                    max={props.range.max}
                    value={props.value}
                    onChange={(e) => {
                        props.handleChange(e);
                    }}
                ></input>
            </div>
        </div>
    );
}
