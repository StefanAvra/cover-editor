import styles from "./Editor.module.css";
import { useState, useEffect, createElement, useRef } from "react";
import SongSelect from "./SongSelect";
import RangeSlider from "./RangeSlider";

export default function Editor() {
    const songOptions = [
        { value: "a", label: "Song A", image: "japan" },
        { value: "b", label: "Song B", image: "low_rider" },
    ];

    const [selectedSong, setSelectedSong] = useState({
        value: "a",
        label: "Song A",
        image: "japan",
    });

    const [imgSource, setImgSource] = useState(
        `/covers/${selectedSong.image}.jpeg`
    );

    const canvasRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        // const canvas = canvasRef.current;
        // const ctx = canvas.getContext("2d");
        // ctx = canvasRef.current.getContext("2d");
    }, []);

    useEffect(() => {
        setImgSource(`/covers/${selectedSong.image}.jpeg`);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            imgRef.current,
            0,
            0,
            imgRef.current.width,
            imgRef.current.height,
            0,
            0,
            canvas.width,
            canvas.height
        );
        console.log(`drawing ${selectedSong.image}`);
    }, [selectedSong, imgRef]);

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
