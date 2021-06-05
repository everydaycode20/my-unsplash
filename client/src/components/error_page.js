import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import "../styles/error_page.scss";

function ErrorPage() {
    useEffect(() => {
        document.title = '404|My Unsplash';
    }, []);

    return (
        <>
            <section className="container-error">
                <h1>Page not available :(</h1>
                <Link to="/">go to main page</Link>
            </section>
        </>
    )
}

export default ErrorPage;