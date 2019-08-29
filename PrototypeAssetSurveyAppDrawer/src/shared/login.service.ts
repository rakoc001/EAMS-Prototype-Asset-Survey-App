import { Injectable } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { User } from "./user.model";

const firebase = require("nativescript-plugin-firebase");

@Injectable()
export class LoginService {
    // tslint:disable-next-line: new-parens
    user = new User;
    constructor(private routerExtensions: RouterExtensions/*,
                private user: User*/) {
    }

    register(user) {
        return new Promise((resolve, reject) => {
            console.log("Creating user: " + user);
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

    login(user) {
        return new Promise((resolve, reject) => {
            console.log("Logging in user: " + user);
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
