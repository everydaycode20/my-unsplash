import React, {useState, useEffect, useRef} from "react";
import { Redirect, Link} from "react-router-dom";
import Auth from "../components/utils/auth";
import "../styles/login.scss";
import CloseIcon from "../images/close_icon.svg";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginError, setLoginError] = useState(false);

    const [redirect, setRedirect] = useState(false);
    const [pass, setPass] = useState(true);

    const refPass = useRef();

    function logUser(e) {
        e.preventDefault();

        fetch("/login", {
            method: "POST", 
            credentials: "include",
            body: JSON.stringify({username: username, password: refPass.current.value}),
            headers:{
                "Content-Type": "application/json"
            }
        }).then((response) => {
			return response.json();
		}).then(r => {
            if (r.status === true) {
				Auth.authenticate(() => {
					setRedirect(true);
                    setPass(true);
				});
			}
            else{
                setLoginError(true);
            }
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        const ac = new AbortController();
        fetch("/user", {credentials: "include"}).then(result =>{
            return result.json();
        }).then(res =>{
            if (res.status === true) {
                Auth.authenticate(() => {
                    setRedirect(true);
                    setPass(true);
                });
            }
            else{
                setRedirect(false);
                setPass(false);
            }
        }).catch(err => console.log(err));
        return () => ac.abort();
    }, []);

    function showPass() {
        if (refPass.current.type === "password") {
            refPass.current.type = "text";
        }
        else{
            refPass.current.type = "password";
        }
    }

    function hideMessage() {
        setLoginError(false);
    }

    if (redirect === true && pass === true) {
        return <Redirect to="/my-unsplash"/>;
    }

    if (redirect === false && pass === false) {
        return(
            <>
            <main className="container-login">
                <form onSubmit={e => logUser(e)}>
                    <h1>Login</h1>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" value={username} onInput={e => setUsername(e.target.value)}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" ref={refPass}/>
                    <button type="submit">login</button>
                    <section className="show">
                        <input type="checkbox" name="chk" id="checkbox" className="checkbox" onClick={() => showPass()}/>
                        <label htmlFor="checkbox" >Show password</label>
                    </section>
                    <span>Don't have an account? <Link to="/register"> Create one</Link> </span>
                    {loginError && <div className="message">
                        <p>incorrect username or password</p>
                        <img src={CloseIcon} alt="close" className="close-icon" onClick={() => hideMessage()}/>
                    </div>}
                </form>
                
            </main> 
            </>
        );
    }

    return null;
    
}

export default Login;