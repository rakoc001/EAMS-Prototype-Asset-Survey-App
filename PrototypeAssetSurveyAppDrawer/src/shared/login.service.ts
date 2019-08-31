import { Injectable } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { User } from "./user.model";

const firebase = require("nativescript-plugin-firebase");

@Injectable()
export class LoginService {
    user = new User();
    constructor(private routerExtensions: RouterExtensions/*,
                private user: User*/) {
    }

    register() {
        return new Promise((resolve, reject) => {
            console.log("Creating user: " + this.user);
            firebase.createUser({
                email: this.user.email,
                password: this.user.password
            }).then(
                function (user: { email: string; password: string; }) {
                    alert("User created, email: " + this.user.email);
                },
                function (errorMessage) {
                    alert("Error: " + errorMessage);
                }
            );
        });
    }

    login() {
        return new Promise((resolve, reject) => {
            console.log("Login Service: Logging in user: " + this.user);
            firebase.login(
                {
                    type: firebase.LoginType.PASSWORD,
                    passwordOptions: {
                        email: this.user.email,
                        password: this.user.password
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
