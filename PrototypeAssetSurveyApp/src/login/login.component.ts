import { Component, OnInit } from "@angular/core";
import { User } from "../shared/user/user.model"; // Need to configure to use kinvey/firebase email-password authentication
import { UserService } from "../shared/user/user.model"; // Need to configure to use kinvey/firebase email-password authentication
import { Router } from "@angular/router";
import { Page } from "tns-core-moules/ui/page";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "login", loadChildren: "./login/login.module#LoginModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "gr-login",
    providers: [UserService],
    moduleId: module.id,
    templateUrl: "./login.component.html"/*,
    styleUrls: ["./login.component.css"]*/
})
export class LoginComponent implements OnInit {
    /*name: string;
    email: string;
    password: string;*/
    user: User;
    isLoggingIn = true;

    constructor(private router: Router, private userService: UserService, private page: Page)) {
        this.user = new User();
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }

//    onSignupWithSocialProviderButtonTap(): void {
//        /* ***********************************************************
//        * For sign up with social provider you can add your custom logic or
//        * use NativeScript plugin for sign up with Facebook
//        * http://market.nativescript.org/plugins/nativescript-facebook
//        *************************************************************/
//    }
//
//    onSignupButtonTap(): void {
//        const name = this.name;
//        const email = this.email;
//        const password = this.password;
//
//        /* ***********************************************************
//        * Call your custom signup logic using the email and password data.
//        *************************************************************/
//    }
    submit() {
        if (this.isLoggingIn) {
            this.login();
        } else {
            this.signup();
        }
    }

    login() {
        this.userService.login(this.user)
            .subscribe(
                () => {
                    alert("Your account was successfully created.");
                    this.toggleDisplay();
                },
                () => alert("Unfortunately we were unable to create your account.")
            );
    }

    toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
    }
}
