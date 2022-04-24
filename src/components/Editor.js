import styles from "./Editor.module.css";
import { useState, useEffect, useRef } from "react";
import SongSelect from "./SongSelect";
import RangeSlider from "./RangeSlider";
import CoverSelect from "./CoverSelect";

export default function Editor() {
    const songOptions = [
        { value: "a", label: "Goldberg City Stories" },
        { value: "b", label: "Tokyo" },
    ];
    const imageOptions = {
        a: [
            "Goldberg City Stories 1",
            "Goldberg City Stories 2",
            "Goldberg City Stories 3",
            "Goldberg City Stories 4",
        ],
        b: ["Tokyo 1", "Tokyo 2", "Tokyo 3", "Tokyo 4", "Tokyo 5"],
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
    const [imageSettings, setImageSettings] = useState({
        saturation: 100,
        hue: 0,
        contrast: 100,
        brightness: 100,
    });

    const canvasRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        const image = new Image();
        image.src = `${process.env.PUBLIC_URL}/covers/${selectedSong.value}/${selectedCover}.jpg`;
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
            ctx.filter = `hue-rotate(${imageSettings.hue}deg) saturate(${imageSettings.saturation}%) contrast(${imageSettings.contrast}%) brightness(${imageSettings.brightness}%)`;

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
    }, [coverImage, canvasRef, selectedCover, selectedSong, imageSettings]);

    function resetSettings() {
        setImageSettings({
            saturation: 100,
            hue: 0,
            contrast: 100,
            brightness: 100,
        });
    }

    function saveImage() {
        canvasRef.current.toBlob(
            (blob) => {
                const a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                a.download = "cover.jpeg";
                a.click();
                a.remove();
            },
            "image/jpeg",
            0.95
        );
    }

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
        console.log(`${e.target.id}: ${e.target.value}`);
        let newSettings = { ...imageSettings };
        newSettings[e.target.id] = e.target.value;
        setImageSettings(newSettings);
    }

    return (
        <div className={styles.Editor}>
            <div className={styles.canvasContainer}>
                <canvas
                    width={1080}
                    height={1080}
                    className={styles.cover}
                    ref={canvasRef}
                ></canvas>
                {loading && <div className={styles.coverLoading}>Loading</div>}
            </div>
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
                <button
                    className={styles.button}
                    type="button"
                    onClick={resetSettings}
                >
                    Reset
                </button>
                <button
                    className={styles.button}
                    type="button"
                    onClick={saveImage}
                >
                    Download
                </button>
            </div>
            <div className={styles.settingsSliders}>
                <RangeSlider
                    range={{ min: 0, max: 200 }}
                    value={imageSettings.saturation}
                    handleChange={handleChangeSlider}
                    effect="saturation"
                ></RangeSlider>
                <RangeSlider
                    range={{ min: 0, max: 359 }}
                    value={imageSettings.hue}
                    handleChange={handleChangeSlider}
                    effect="hue"
                ></RangeSlider>
                <RangeSlider
                    range={{ min: 10, max: 200 }}
                    value={imageSettings.contrast}
                    handleChange={handleChangeSlider}
                    effect="contrast"
                ></RangeSlider>
                <RangeSlider
                    range={{ min: 10, max: 200 }}
                    value={imageSettings.brightness}
                    handleChange={handleChangeSlider}
                    effect="brightness"
                ></RangeSlider>
            </div>
        </div>
    );
}
