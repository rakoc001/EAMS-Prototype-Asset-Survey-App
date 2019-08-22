import { Injectable } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

const firebase = require("nativescript-plugin-firebase");

@Injectable()
export class LoginService {
    constructor(private routerExtensions: RouterExtensions) {

    }

    register(user) {
        return new Promise((resolve, reject) => {
            console.log(user);
            firebase.createUser({
                email: user.email,
                password: user.password
            }).then(
                function (user) {
                    alert("User created, email: " + user.email)
                },
                function (errorMessage) {
                    alert("Error: " + errorMessage)
                }
            );
        });
    }

    login(user) {
        return new Promise((resolve, reject) => {
            console.log(user);
            firebase.login(
                {
                    type: firebase.LoginType.PASSWORD,
                    passwordOptions: {
                        email: user.email,
                        password: user.password
                    }
                })
                .then(result => JSON.stringify(result))
                .catch(error => console.log(error));
        });
    }

    logout() {
        firebase.logout();
        this.routerExtensions.navigate(["/login"]);
    }
}
