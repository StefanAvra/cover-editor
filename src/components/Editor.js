import styles from "./Editor.module.css";
import { useState, useEffect, useRef } from "react";
import SongSelect from "./SongSelect";
import RangeSlider from "./RangeSlider";
import CoverSelect from "./CoverSelect";
import Button from "./Button";

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

    const dlIcon = (
        <svg
            id="Ebene_1"
            data-name="Ebene 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50.78 46.57"
            style={{
                fill: getComputedStyle(document.body).getPropertyValue(
                    "--bg-color"
                ),
                height: "1em",
                position: "absolute",
                right: "8px",
                pointerEvents: "none",
            }}
        >
            <path
                class="cls-1"
                d="M4.25,31.55a19.42,19.42,0,0,1,2-7.86A35.45,35.45,0,0,1,18.44,9.94c5.39-3.67,11.2-5.7,16.35-5.7A14.35,14.35,0,0,1,41,5.53,9.35,9.35,0,0,1,45,9a9.61,9.61,0,0,1,1.19,2.76A12.08,12.08,0,0,1,46.53,15a19.42,19.42,0,0,1-2,7.86A35.44,35.44,0,0,1,32.34,36.63C27,40.3,21.14,42.32,16,42.32A14.35,14.35,0,0,1,9.74,41,9.41,9.41,0,0,1,5.81,37.6a10.2,10.2,0,0,1-1.19-2.76,12.17,12.17,0,0,1-.37-3.29m46-20.89a14.09,14.09,0,0,0-1.72-4,13.56,13.56,0,0,0-5.67-5A18.46,18.46,0,0,0,34.79,0c-6,0-12.65,2.28-18.74,6.43A39.77,39.77,0,0,0,2.42,21.88,23.58,23.58,0,0,0,0,31.48a16.91,16.91,0,0,0,.51,4.43,14,14,0,0,0,1.72,4,13.47,13.47,0,0,0,5.67,5A18.49,18.49,0,0,0,16,46.57c6,0,12.65-2.28,18.74-6.43A39.72,39.72,0,0,0,48.36,24.68a23.5,23.5,0,0,0,2.42-9.59,16.86,16.86,0,0,0-.51-4.43"
            />
            <polygon
                class="cls-1"
                points="15.17 22.44 10.42 22.44 18.23 37.45 41.56 22.44 29.77 22.44 36.01 9.08 31.11 9.08 22.98 26.55 27.59 26.55 19.79 31.56 17.18 26.55 15.17 22.44"
            />
        </svg>
    );

    const resetIcon = (
        <svg
            id="Ebene_1"
            data-name="Ebene 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50.78 46.57"
            style={{
                fill: getComputedStyle(document.body).getPropertyValue(
                    "--bg-color"
                ),
                height: "1em",
                position: "absolute",
                right: "8px",
                pointerEvents: "none",
            }}
        >
            <polygon
                class="cls-1"
                points="36.5 8.2 14.28 21.96 22.43 38.37 24.8 33.28 19.98 23.59 33.12 15.46 36.5 8.2"
            />
            <path
                class="cls-1"
                d="M4.25,31.55a19.42,19.42,0,0,1,2-7.86A35.45,35.45,0,0,1,18.44,9.94c5.39-3.67,11.2-5.7,16.35-5.7A14.35,14.35,0,0,1,41,5.53,9.35,9.35,0,0,1,45,9a9.61,9.61,0,0,1,1.19,2.76A12.08,12.08,0,0,1,46.53,15a19.42,19.42,0,0,1-2,7.86A35.44,35.44,0,0,1,32.34,36.63C27,40.3,21.14,42.32,16,42.32A14.35,14.35,0,0,1,9.74,41,9.41,9.41,0,0,1,5.81,37.6a10.2,10.2,0,0,1-1.19-2.76,12.17,12.17,0,0,1-.37-3.29m46-20.89a14.09,14.09,0,0,0-1.72-4,13.56,13.56,0,0,0-5.67-5A18.46,18.46,0,0,0,34.79,0c-6,0-12.65,2.28-18.74,6.43A39.77,39.77,0,0,0,2.42,21.88,23.58,23.58,0,0,0,0,31.48a16.91,16.91,0,0,0,.51,4.43,14,14,0,0,0,1.72,4,13.47,13.47,0,0,0,5.67,5A18.49,18.49,0,0,0,16,46.57c6,0,12.65-2.28,18.74-6.43A39.72,39.72,0,0,0,48.36,24.68a23.5,23.5,0,0,0,2.42-9.59,16.86,16.86,0,0,0-.51-4.43"
            />
        </svg>
    );

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
                <Button
                    onClick={resetSettings}
                    name="Reset"
                    iconSvg={resetIcon}
                />
                <Button onClick={saveImage} name="Download" iconSvg={dlIcon} />
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
