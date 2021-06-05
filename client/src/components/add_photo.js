import React, {useState, useRef, useContext} from "react";
import "../styles/add_photo.scss"
import {ImageContext} from "./utils/context";

function AddPhoto({setShowSubmit}) {
    
    const {setShowImages} = useContext(ImageContext);

    const [numberChar, setNumberChar] = useState(50);

    const [label, setLabel] = useState("");
    const [url, setUrl] = useState("");
    const [spanColor, setSpanColor] = useState(false);
    const refInput = useRef(null);
    const [wrongUrl, setWrongUrl] = useState(false);

    function charCount(e) {
        
        if (e && e.key !== "Backspace") {
            setNumberChar(50 - refInput.current.value.length);
        }
        if (e.key === "Backspace" && numberChar !== 50) {
            setNumberChar(50 - refInput.current.value.length);
        }

        if (refInput.current.value.length >= 40) {
            setSpanColor(true);
        }
        else{
            setSpanColor(false);
        }
    }

    function hideSubmit() {
        setShowSubmit(false);
    }

    function add(e) {
        e.preventDefault();
        fetch("/add", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({label: label, url: url}),
            headers:{
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(result => {
            if (result.status === true) {
                setShowImages(url + Date.now());
                setShowSubmit(false);
            }
            
        }).catch(err => console.log(err));
        
    }

    function countUrl(e) {
        
        if (url.length === 0) {
            setWrongUrl(false);
        }
    }

    return (
        <>
            <div className="add-box">
                <form onSubmit={(e) => add(e)}>
                    <h1>Add a new photo</h1>
                    <label htmlFor="">Label<span className="char-left" color={spanColor.toString()}>{` ${numberChar} `}</span>characters left</label>
                    <input type="text" maxLength="50" onKeyUp={e => charCount(e)} ref={refInput} value={label} onInput={e => setLabel(e.target.value)}/>
                    <label htmlFor="" >Photo URL</label>
                    <input type="text" value={url} onInput={e => setUrl(e.target.value)} onKeyUp={e => countUrl(e)} />
                    <section className="action-btn">
                        {wrongUrl && <span className="error-message">wrong url</span>}
                        <button type="button" onClick={() => hideSubmit()} className="cancel-btn">Cancel</button>
                        <button type="submit" className="submit-btn">Submit</button>
                    </section>
                </form>
                
                <div className="background" onClick={() => hideSubmit()}></div>
            </div>
        </>
    );

}

export default AddPhoto;