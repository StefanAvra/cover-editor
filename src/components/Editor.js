import styles from "./Editor.module.css";
import { useState, useEffect, useRef } from "react";
import SongSelect from "./SongSelect";
import RangeSlider from "./RangeSlider";

export default function Editor() {
    const songOptions = [
        { value: "a", label: "Song A", image: "japan" },
        { value: "b", label: "Song B", image: "low_rider" },
    ];

    const imageOptions = [];

    const [selectedSong, setSelectedSong] = useState({
        value: "a",
        label: "Song A",
        image: "japan",
    });

    const canvasRef = useRef(null);
    const [coverImage, setCoverImage] = useState(null);

    useEffect(() => {
        const image = new Image();
        image.src = `/covers/${selectedSong.image}.jpeg`;
        image.onload = () => setCoverImage(image);
    }, [selectedSong]);

    useEffect(() => {
        if (coverImage && canvasRef) {
            drawImageToCtx();
        }
    }, [coverImage, canvasRef]);

    function drawImageToCtx() {
        console.log(`drawing image to ctx`);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const imageToDraw = coverImage;

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
