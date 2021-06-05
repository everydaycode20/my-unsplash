import React from "react";
import "../styles/delete.scss";

function DeleteImage({setShowDelete}) {
    
    function closeDelete() {
        setShowDelete(false);
    }
    
    return (
        <>
            <div className="delete-box">
                <section className="container-delete-box">
                    <h1>Are you sure?</h1>
                    <section className="action-btn">
                        <button type="button" className="notDelete-btn" onClick={() => closeDelete()}>Not Delete</button>
                        <button type="button" className="delete-btn">Delete</button>
                    </section>
                </section>
                
                <div className="background" onClick={() => closeDelete()}></div>
            </div>
        </>
    );
}

export default DeleteImage;