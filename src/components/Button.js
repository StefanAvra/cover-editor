import styles from "./Button.module.css";

export default function Button({ onClick, iconSvg, name }) {
    // let iconSvg = (
    //     <svg
    //         id="Ebene_1"
    //         data-name="Ebene 1"
    //         xmlns="http://www.w3.org/2000/svg"
    //         viewBox="0 0 50.78 46.57"
    //         style={{
    //             fill: getComputedStyle(document.body).getPropertyValue(
    //                 "--bg-color"
    //             ),
    //             height: "2em",
    //             position: "absolute",
    //             right: "8px",
    //             pointerEvents: "none",
    //         }}
    //     >
    //         <path
    //             class="cls-1"
    //             d="M4.25,31.55a19.42,19.42,0,0,1,2-7.86A35.45,35.45,0,0,1,18.44,9.94c5.39-3.67,11.2-5.7,16.35-5.7A14.35,14.35,0,0,1,41,5.53,9.35,9.35,0,0,1,45,9a9.61,9.61,0,0,1,1.19,2.76A12.08,12.08,0,0,1,46.53,15a19.42,19.42,0,0,1-2,7.86A35.44,35.44,0,0,1,32.34,36.63C27,40.3,21.14,42.32,16,42.32A14.35,14.35,0,0,1,9.74,41,9.41,9.41,0,0,1,5.81,37.6a10.2,10.2,0,0,1-1.19-2.76,12.17,12.17,0,0,1-.37-3.29m46-20.89a14.09,14.09,0,0,0-1.72-4,13.56,13.56,0,0,0-5.67-5A18.46,18.46,0,0,0,34.79,0c-6,0-12.65,2.28-18.74,6.43A39.77,39.77,0,0,0,2.42,21.88,23.58,23.58,0,0,0,0,31.48a16.91,16.91,0,0,0,.51,4.43,14,14,0,0,0,1.72,4,13.47,13.47,0,0,0,5.67,5A18.49,18.49,0,0,0,16,46.57c6,0,12.65-2.28,18.74-6.43A39.72,39.72,0,0,0,48.36,24.68a23.5,23.5,0,0,0,2.42-9.59,16.86,16.86,0,0,0-.51-4.43"
    //         />
    //         <polygon
    //             class="cls-1"
    //             points="15.17 22.44 10.42 22.44 18.23 37.45 41.56 22.44 29.77 22.44 36.01 9.08 31.11 9.08 22.98 26.55 27.59 26.55 19.79 31.56 17.18 26.55 15.17 22.44"
    //         />
    //     </svg>
    // );
    return (
        <div className={styles.buttonContainer}>
            <button className={styles.button} type="button" onClick={onClick}>
                {name}
                {iconSvg}
            </button>
        </div>
    );
}
