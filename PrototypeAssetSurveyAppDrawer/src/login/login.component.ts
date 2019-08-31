import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import { setString } from "tns-core-modules/application-settings";
import { alert, LoginService, User } from "../shared";

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
    user = new User();

    isLoggingIn = true;
    constructor(
        private router: Router,
        private routerExtensions: RouterExtensions,
        private page: Page,
        private userService: LoginService
    ) {
    }

    toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    submit() {
        console.log("Submit button pressed");
        if (!this.user.isValidEmail()) {
            alert("Enter a valid email address.")
            
            return;
        }

        if (this.isLoggingIn) {
            console.log("triggering login");
            this.login();
        } else {
            this.signUp();
        }
    }

    login() {
        console.log("Login triggered");
        console.log("Login Component: User details: " + this.user);
        this.userService.login(this.user.email, this.user.password)
            .then(status => {
                setString("userID", String(this.user.userID));
                this.routerExtensions.navigate(["/home"], { clearHistory: true });
            }, err => {
                this.clearFields();
                alert("Unfortunately we could not find your account.")
            });
    }
    /*login(user) {
        console.log("Login triggered");
        console.log("Login Component: User details: " + JSON.stringify(this.user));
        this.userService.login(user)
            .then(status => {
                setString("userID", String(this.user.userID));
                this.routerExtensions.navigate(["/home"], { clearHistory: true });
            }, err => {
                this.clearFields();
                alert("Unfortunately we could not find your account.")
            });
    }*/

    signUp() {
        this.userService.register(this.user.email, this.user.password)
            .then(status => {
                alert("Your account was successfully created.");
                this.toggleDisplay();
                this.clearFields();
            }, err => {
                this.clearFields();
                alert("Unfortunately we were unable to create your account.")
            });
    }

    clearFields() {
        this.user.email = "";
        this.user.password = "";
    }

}
