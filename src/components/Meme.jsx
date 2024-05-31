import React from "react";
import Draggable from "react-draggable";

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg",
        textSize: "2em",
        textColor: "#FFFFFF"
    });
    const [allMemes, setAllMemes] = React.useState([]);
    const [imageLoaded, setImageLoaded] = React.useState(false);

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then((res) => res.json())
            .then((data) => setAllMemes(data.data.memes))
            .catch(() => alert("Failed to load meme templates. Please try again later."));
    }, []);

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const url = allMemes[randomNumber].url;
        setMeme((prevMeme) => ({
            ...prevMeme,
            randomImage: url,
            topText: "",
            bottomText: ""
        }));
        setImageLoaded(false);
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setMeme((prevMeme) => ({
            ...prevMeme,
            [name]: value
        }));
    }

    function handleImageLoad() {
        setImageLoaded(true);
    }

    return (
        <main>
            <h1>Meme Generator</h1>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Enter top text here"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Enter bottom text here"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Text Size (e.g., 2em or 2px)"
                    className="form--input"
                    name="textSize"
                    value={meme.textSize}
                    onChange={handleChange}
                />
                <input 
                    type="color"
                    placeholder="Text Color"
                    className="color"
                    name="textColor"
                    value={meme.textColor}
                    onChange={handleChange}
                /><span >Change color</span>
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                    disabled={!allMemes.length} 
                >
                    Generate Meme 🖼
                </button>
                {!allMemes.length && <p>Loading meme templates...</p>}
            </div>
            <div className="meme">
                <img 
                    src={meme.randomImage} 
                    className="meme--image" 
                    alt="Meme" 
                    onLoad={handleImageLoad} 
                />
                {!imageLoaded && <p>Loading meme image...</p>}
                {imageLoaded && (
                    <>
                        <Draggable bounds="parent">
                            <h2 
                                className="meme--text top" 
                                   style={{ fontSize: meme.textSize, color: meme.textColor }}
                            >
                                {meme.topText || "Top Text"}
                            </h2>
                        </Draggable>
                        <Draggable bounds="parent">
                            <h2 
                                className="meme--text bottom" 
                                style={{ fontSize: meme.textSize, color: meme.textColor }}
                            >
                                {meme.bottomText || "Bottom Text"}
                            </h2>
                        </Draggable>
                    </>
                )}
            </div>
            <footer className="footer">
                <p>&copy; 2024 Your Meme Generator</p>
            </footer>
        </main>
    );
}
