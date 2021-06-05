import React, {useState, useEffect, useRef} from "react";
import { Redirect, Link} from "react-router-dom";
import "../styles/register.scss";
import CloseIcon from "../images/close_icon.svg";

function Register() {

    const [user, setUser] = useState("");

    const [isRegistered, setIsRegistered] = useState(false);

    const [showMessage, setShowMessage] = useState(false);

    const [redirect, setRedirect] = useState(0);

    const [message, setMessage] = useState("");
    const refPass = useRef();
    const refConfirmPass = useRef();
    const refVal = useRef();

    var isPassReady = {passNum: false, passSym: false, passLength: false, passMatch: false};

    const [isReady] = useState(isPassReady);

    function submitUser() {  
        
        fetch("/register", {
            method: "POST",
            body: JSON.stringify({username: user, password: refPass.current.value, confirmPassword: refConfirmPass.current.value}),
            credentials: "include",
            headers:{
                "Content-Type": "application/json",
            },
        }).then(response => {
            return response.json()
        }).then(data => {
            if (data.status === true) {
                setIsRegistered(true);
            }
            else{
                setMessage(data.message);
                setShowMessage(true);
            }
        });

    }

    function submit(e) {
        e.preventDefault();
        
        checkForm();
    }

    function showPass() {
        if (refPass.current.type === "password" && refConfirmPass.current.type === "password") {
            refPass.current.type = "text";
            refConfirmPass.current.type = "text";
        }
        else{
            refPass.current.type = "password";
            refConfirmPass.current.type = "password";
        }
    }

    function checkPass() {
        let regExpNum = /\d+/;

        let regExpSym = /\W+/;
        
        if (refPass.current.value.length >= 8) {
            refVal.current.childNodes[0].classList.add("shown");
            isReady.passLength = true;
        }
        else{
            refVal.current.childNodes[0].classList.remove("shown");
            isReady.passLength = false;
        }

        if (refPass.current.value.match(regExpNum)) {
            refVal.current.childNodes[1].classList.add("shown");
            isReady.passNum = true;
        }
        else{
            refVal.current.childNodes[1].classList.remove("shown");
            isReady.passNum = false;
        }

        if (refPass.current.value.match(regExpSym)) {
            refVal.current.childNodes[2].classList.add("shown");
            isReady.passSym = true;
        }
        else{
            refVal.current.childNodes[2].classList.remove("shown");
            isReady.passSym = false;
        }
        
        if (refConfirmPass.current.value === refPass.current.value && refConfirmPass.current.value.length !== 0) {
            refVal.current.childNodes[3].classList.add("shown");
            isReady.passMatch = true;
        }
        else{
            refVal.current.childNodes[3].classList.remove("shown");
            isReady.passMatch = false;
        }
    }

    function checkConfirmPass() {
        if (refConfirmPass.current.value === refPass.current.value && refPass.current.value.length !== 0) {
            refVal.current.childNodes[3].classList.add("shown");
            isReady.passMatch = true;
        }
        else{
            refVal.current.childNodes[3].classList.remove("shown");
            isReady.passMatch = false;
        }
    }

    function checkForm() {
        if (user.length === 0) {
            setMessage("choose a username")
            setShowMessage(true);
        }
        else if (refPass.current.value.length === 0){
            setMessage("enter a password")
            setShowMessage(true);
        }
        else if (refConfirmPass.current.value.length === 0) {
            setMessage("confirm your password")
            setShowMessage(true);
        }
        else if(!checkIsReady(isReady)){
            setMessage("your password should follow all the rules listed above");
            setShowMessage(true);
        }
        else{
            submitUser();
            setMessage("")
            setShowMessage(false);
        }
    }

    function checkIsReady(obj) {
        const val = Object.values(obj);
        
        if (val.includes(false)) {
            return false;
        }
        else{
            return true;
        }
    }

    function hideMessage() {
        setShowMessage(false);
    }

    useEffect(() => {
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

    if (redirect === 2) {
        return <Redirect to="my-unsplash"/>
    }

    if (redirect === 1) {
        return(
            <>
            {isRegistered ? <Redirect to="/login"/> :
                <main className="container-register" >
                    <form onSubmit={e => submit(e)}>
                        <h1>Create  your account</h1>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" value={user} onInput={e => setUser(e.target.value)}/>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onKeyUp={() => {checkPass()}} ref={refPass}/>
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <input type="password" name="confirm_password" id="confirm-password" onKeyUp={() => {checkConfirmPass()}} ref={refConfirmPass}/>
                        <section className="pass-req" ref={refVal}>
                            <p>at least 8 characters</p>
                            <p>at least one number</p>
                            <p>at least one symbol</p>
                            <p>both passwords must match</p>
                        </section>
                        <button type="submit">sign up</button>
                        <section className="show">
                            <input type="checkbox" name="chk" id="checkbox" className="checkbox" onClick={() => showPass()}/>
                            <label htmlFor="checkbox" >Show password</label>
                        </section>
                        <span>Already have an account?<Link to="/login"> Login</Link> </span>
                    </form>
                    {showMessage && <div className="message">
                        <p>{message}</p>
                        <img src={CloseIcon} alt="close" className="close-icon" onClick={() => hideMessage()}/>
                    </div>}
                </main>
            }
            </>
        )
    }

    return null;
    
}

export default Register;