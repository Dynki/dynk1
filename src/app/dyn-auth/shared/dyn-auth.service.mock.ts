export class AuthServiceMock {
    isLoggedIn: Boolean;
    currentUserName: String;

    constructor(){
        this.isLoggedIn = false;
    }

    public login(username: String, password: String){
        this.currentUserName = username.slice(0,1);
        this.isLoggedIn = true;
    }

    public logout(){
        this.isLoggedIn = false;
    }
}
