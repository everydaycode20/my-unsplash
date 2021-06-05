import React, {useState} from "react";
import NavBar from "../components/navbar";
import Images from "../components/images";
import "../styles/main.scss";
import {ImageContext} from "./utils/context";

function Main() {

    const [showImages, setShowImages] = useState("");

    const [search, setSearch] = useState("");

    return (
        <>
        <main>
            <ImageContext.Provider value={{showImages, setShowImages}}>
                <NavBar setSearch={setSearch}/>
                <Images search={search}/>
            </ImageContext.Provider>
        </main>
        </>
    );

}

export default Main;