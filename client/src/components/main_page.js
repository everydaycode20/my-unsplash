import React, {useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import WebpFile from "../images/final.webp";
import Gif from "../images/gif.gif";
import "../styles/main-page.scss";

function MainPage() {

    const [redirect, setRedirect] = useState(0);
    
    useEffect(() => {
        document.title = 'My Unsplash';
        fetch("/user", {credentials: "include"}).then(result =>{
            return result.json();
        }).then(res =>{
            if (res.status === true) {
                setRedirect(2);
            }
            else{
                setRedirect(1);
            }
            
        }).catch(err => console.log(err));
        
    }, []);

    if (redirect === 1) {
        return (
            <>
                <section className="main-container-page">
                    <section className="main-section">
                        <div className="box-title">
                            <h1>My Unsplash</h1>
                            <h2>A place to save your favorite photos</h2>
                        </div>
                        <section className="btn-container">
                            <Link to="/login">
                                login
                            </Link>
                            <Link to="/register">
                                register
                            </Link>
                        </section>
                    </section>
    
                    <picture>
                        <source srcSet={WebpFile} type="image/webp" alt="image webp"/>
                        <source srcSet={Gif} type="image/gif" />
                        <img src={Gif} alt="Alt Text!" />  
                    </picture>
                </section>
            </>
        );
    }

    if (redirect === 2) {
        return <Redirect to="my-unsplash"/>
    }

    return null;
}

export default MainPage;