const Auth = {
    isAuthenticated: false,
    authenticate(cb){
        fetch("/user", {credentials: "include"}).then(result =>{
            this.isAuthenticated = true;
            if (typeof cb === 'function') {
                cb(result.json());
            }
        }).catch(err => console.log(err));
    }
}

export default Auth;