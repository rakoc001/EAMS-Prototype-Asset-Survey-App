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

    register(email: string, password: string) {
        return new Promise((resolve, reject) => {
            console.log("Creating user: " + email);
            firebase.createUser({
                email: email,
                password: password
            }).then(resolve) 
              .catch(reject);
        });
    }

    login(email: string, password: string) {
        return new Promise((resolve, reject) => {
            console.log("Login Service: Logging in user: " + email);
            firebase.login(
                {
                    type: firebase.LoginType.PASSWORD,
                    passwordOptions: {
                        email,
                        password
                    }
                })
                .then(resolve)
                .catch(reject);
        });
    }

    logout() {
        firebase.logout();
        this.routerExtensions.navigate(["/login"]);
    }
}
