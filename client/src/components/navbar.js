import React, {useState} from "react";
import MyUnsplashLogo from "../images/my_unsplash_logo.svg";
import SearchIcon from "../images/search_icon.svg";
import CloseIcon from "../images/close_icon.svg";
import AddPhoto from "../components/add_photo";
import "../styles/navbar.scss";
import {Link, Redirect} from "react-router-dom";

function NavBar({setSearch}) {

    const [showSubmit, setShowSubmit] = useState(false);

    const [showBtn, setShowBtn] = useState(false);

    const [logout, setLogout] = useState(false);

    function openSubmit() {
        setShowSubmit(true);
    }

    function logOut() {
        fetch("/logout", {credentials: "include"}).then(result => {return result.json()}).then(d =>{
            if (d.status === false) {
                console.log("log out");
                setLogout(true);
            }
            
        }).catch(err => console.log(err));
    }

    function showBtnContainer() {
        setShowBtn(true);

        if (showBtn === true) {
            setShowBtn(false);
        }
    }

    function hideBtnContainer() {
        setShowBtn(false);
    }

    function searchImage(e) {
        setSearch(e.target.value);
    }

    return (
        <>
        {logout ? <Redirect to="/login"/> :
            <div className="navbar-container">
                <nav className="navbar">
                    <Link to="/my-unsplash" className="main-link">
                        <img src={MyUnsplashLogo} alt="my unsplash logo"/>
                    </Link>
                    
                    <form className="search-input">
                        <img src={SearchIcon} alt="search"/>
                        <input type="text" placeholder="Search by name" onChange={(e) => searchImage(e)}/>
                    </form>
                    <button type="button" className="add-btn" onClick={() => openSubmit()}>Add a photo</button>
                    <div className="dot-container" onClick={() => showBtnContainer()}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <section className="logout-container" showcontainer={showBtn.toString()}>
                        <button type="button" onClick={() => logOut()} className="logout-btn">Log out</button>
                        <img src={CloseIcon} alt="close" className="close-icon" onClick={() => hideBtnContainer()}/>
                    </section>
                </nav>
            </div>
        }
            {showSubmit && <AddPhoto setShowSubmit={setShowSubmit}/>}
        </>
    );

}

export default NavBar;