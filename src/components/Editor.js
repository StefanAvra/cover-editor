import styles from "./Editor.module.css";
import { useState, useEffect, createElement, useRef } from "react";
import SongSelect from "./SongSelect";
import RangeSlider from "./RangeSlider";
import covers from "./covers/covers";

//create your forceUpdate hook
function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue((value) => value + 1); // update the state to force render
}

export default function Editor() {
    const songOptions = [
        { value: "a", label: "Song A", image: "japan" },
        { value: "b", label: "Song B", image: "low_rider" },
    ];

    const imageOptions = [];
    const forceUpdate = useForceUpdate();

    const [selectedSong, setSelectedSong] = useState({
        value: "a",
        label: "Song A",
        image: "japan",
    });

    const [imgSource, setImgSource] = useState();
    // `/covers/${selectedSong.image}.jpeg`

    const canvasRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        // const canvas = canvasRef.current;
        // const ctx = canvas.getContext("2d");
        // ctx = canvasRef.current.getContext("2d");
    }, []);

    useEffect(() => {
        // setImgSource(`/covers/${selectedSong.image}.jpeg`);
        setImgSource(covers.filter((img) => img.includes(selectedSong.image)));
        console.log(
            `imgSource is: ${imgSource} and set it to ${selectedSong.image} and ${covers}`
        );
    }, [selectedSong]);

    useEffect(() => {
        // const image = createElement("img");
        // image.src = imgSource;
        // imgRef.onload = () => {
        //     drawImageToCtx();
        // };
        drawImageToCtx();
    }, [imgSource]);

    function drawImageToCtx() {
        forceUpdate();

        console.log(`drawing image to ctx`);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const imageToDraw = imgRef.current;

        ctx.drawImage(
            imageToDraw,
            0,
            0,
            imageToDraw.width,
            imageToDraw.height,
            0,
            0,
            canvas.width,
            canvas.height
        );
    }

    function handleChangeSong(selectedSong) {
        setSelectedSong(
            songOptions.filter((option) => option.value === selectedSong)[0]
        );
    }

    function handleChangeSlider(e) {
        console.log(e.target.value);
        console.log(e.target.id);
    }

    return (
        <div className={styles.Editor}>
            <canvas
                width={640}
                height={640}
                className={styles.cover}
                ref={canvasRef}
            ></canvas>
            <img
                className={styles.hidden}
                src={imgSource}
                alt="cover art"
                ref={imgRef}
                // onChange={}
            />
            <div className={styles.settings}>
                <SongSelect
                    selectedSong={selectedSong}
                    options={songOptions}
                    handleChangeSong={handleChangeSong}
                ></SongSelect>
                <RangeSlider
                    range={{ min: 0, max: 200 }}
                    defaultValue={100}
                    handleChange={handleChangeSlider}
                    effect="saturation"
                ></RangeSlider>
                <RangeSlider
                    range={{ min: 0, max: 359 }}
                    defaultValue={0.1}
                    handleChange={handleChangeSlider}
                    effect="hue"
                ></RangeSlider>
                <RangeSlider
                    range={{ min: 0, max: 100 }}
                    handleChange={handleChangeSlider}
                    effect="contrast"
                ></RangeSlider>
            </div>
        </div>
    );
}

const Image = (props) => (
    <img className={styles.hidden} src={props.imgSource} alt="cover art" />
);
