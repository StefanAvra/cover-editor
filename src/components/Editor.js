import styles from "./Editor.module.css";
import { useState, useEffect, useRef } from "react";
import SongSelect from "./SongSelect";
import RangeSlider from "./RangeSlider";
import CoverSelect from "./CoverSelect";

export default function Editor() {
    const songOptions = [
        { value: "a", label: "Song A" },
        { value: "b", label: "Song B" },
    ];

    const imageOptions = {
        a: ["japan", "pexels-aleksandar-pasaric-2338113"],
        b: ["low_rider", "Car Being Wash by Man"],
    };

    const [selectedSong, setSelectedSong] = useState({
        value: "a",
        label: "Song A",
    });

    const [selectedCover, setSelectedCover] = useState(
        imageOptions[selectedSong.value][0]
    );
    const [coverImage, setCoverImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const canvasRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        const image = new Image();
        image.src = `/covers/${selectedSong.value}/${selectedCover}.jpeg`;
        image.onload = () => {
            setCoverImage(image);
            setLoading(false);
        };
    }, [selectedSong, selectedCover]);

    useEffect(() => {
        if (coverImage && canvasRef) {
            console.log(
                `drawing image (${selectedSong.value}/${selectedCover}) to ctx`
            );
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
    }, [coverImage, canvasRef, selectedCover, selectedSong]);

    function handleChangeSong(selectedSong) {
        setSelectedSong(
            songOptions.filter((option) => option.value === selectedSong)[0]
        );
        setSelectedCover(imageOptions[selectedSong][0]);
    }

    function handleChangeCover(selectedCover) {
        console.log(`selected cover: ${selectedCover}`);
        setSelectedCover(selectedCover);
    }

    function handleChangeSlider(e) {
        console.log(e.target.value);
        console.log(e.target.id);

        if (e.target.id === "hue") {
            rotateHue(e.target.value);
        }
    }

    function rotateHue(angle) {
        if (coverImage && canvasRef) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            const imageToDraw = coverImage;
            ctx.filter = `hue-rotate(${angle}deg)`;

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
    }

    return (
        <div className={styles.Editor}>
            <canvas
                width={640}
                height={640}
                className={styles.cover}
                ref={canvasRef}
            ></canvas>
            {loading && <div className={styles.coverLoading}>Loading</div>}
            <div className={styles.settings}>
                <SongSelect
                    selectedSong={selectedSong}
                    options={songOptions}
                    handleChange={handleChangeSong}
                ></SongSelect>
                <CoverSelect
                    options={imageOptions[selectedSong.value]}
                    handleChange={handleChangeCover}
                ></CoverSelect>
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
