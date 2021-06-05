import React, {useState, useContext, useEffect, useRef} from "react";
import "../styles/images.scss";
import OpenInNew from "../images/open_in_new_icon.svg";
import {ImageContext} from "./utils/context";

function Images({search}) {

    const [images, setImages] = useState([]);

    const {showImages} = useContext(ImageContext);

    const refImageElm = useRef([]);

    const [renderImages, setRenderImages] = useState(0);


    function deleteFn(id) {
        
        fetch("/delete", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({imageId: id}),
            headers:{
                "Content-Type": "application/json",
            }
        }).then(data => {return data.json()}).then(res => {
            if (res.status === true) {
                setRenderImages(renderImages + Date.now());
            }
        }).catch(err => console.log(err));
    }

    function lookForImages() {

        refImageElm.current.forEach(ref => {
            if (ref !== null) {
                if (!ref.textContent.includes(search)) {
                    ref.parentNode.parentNode.classList.add("show-image");
                }
                else{
                    ref.parentNode.parentNode.classList.remove("show-image");
                }
            }
            
        });
    }

    lookForImages();
    
    useEffect(() => {
        fetch("/images", {credentials: "include"}).then(result => {
            return result.json()
        }).then(images => {
            setImages(images.images);
        }).catch(err => console.log(err));

    }, [renderImages, showImages]);

    return (
        <>
            <section className="image-layout">
                <ul className="grid">
                    {
                        images !== undefined && images.map((image, i) => {
                            return (
                            <li key={image._id} >
                                <img src={image.url} alt={image.label} className="image-li"/>
                                <div className="overlay">
                                    <div className="options-overlay">
                                        <a href={image.url} target="_blank" rel="noopener noreferrer"><img src={OpenInNew} alt="open in new tab" className="new-tab"/></a>
                                        <button className="delete-btn" onClick={() => deleteFn(image._id)}>delete</button>
                                    </div>
                                    <p ref={el => refImageElm.current[i] = el}>{image.label}</p>
                                </div>
                            </li>
                            )
                        })
                    }
                </ul>
            </section>
            {/* {showDelete && <DeleteImage setShowDelete={setShowDelete}/>} */}
        </>
    );
}

export default Images;