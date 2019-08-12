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
    user: User;

    isLoggingIn = true;

    toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
    }

    constructor(
        private router: Router,
        private routerExtensions: RouterExtensions,
        private page: Page,
        private userService: LoginService,
    ) {
        this.user = new User();
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    submit() {
        if (!this.user.isValidEmail()) {
            alert("Enter a valid email address.");
            return;
        }

        if (this.isLoggingIn) {
            this.login();
        } else {
            this.signUp();
        }
    }

    login() {
        this.userService.login(this.user)
            .then(status => {
                setString("user_id", this.user.email);
                this.routerExtensions.navigate(["/"], { clearHistory: true});
            }, err => {
                 this.clearFields();
                 alert("Unfortunately we could not find your account.");
            });
    }

    signUp() {
        this.userService.register(this.user)
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
        this.user.email = '';
        this.user.password = '';
    }
}

// import { Component, OnInit } from "@angular/core";
// import { User } from "../shared/user/user.model"; // Need to configure to use kinvey/firebase email-password authentication
// import { UserService } from "../shared/user/user.service"; // Need to configure to use kinvey/firebase email-password authentication
// import { Router } from "@angular/router";
// import { Page } from "tns-core-modules/ui/page";
//
// @Component({
//     selector: "gr-login",
//     providers: [UserService],
//     moduleId: module.id,
//     templateUrl: "./login.component.html"
// })
// export class LoginComponent implements OnInit {
//     /*name: string;
//     email: string;
//     password: string;*/
//     user: User;
//     isLoggingIn = true;
//
//     constructor(private router: Router, private userService: UserService, private page: Page) {
//         this.user = new User();
//         this.user.email = "email1@example.com";
//         this.user.password = "password";
//     }
//
//     ngOnInit() {
//         this.page.actionBarHidden = true;
//     }
//
//     submit() {
//         if (this.isLoggingIn) {
//             this.login();
//         } else {
//             this.signUp();
//         }
//     }
//
//     login() {
//         this.userService.login(this.user)
//             .subscribe(
//                 () => this.router.navigate(["/home"]),
//                 (error) => alert("Unfortunately we could not find your account.")
//             );
//     }
//
//     signUp() {
//         this.userService.register(this.user)
//             .subscribe(
//                 () => {
//                     alert("Your account was successfully created.");
//                     this.toggleDisplay();
//                 },
//                 () => alert("Unfortunately we were unable to create your account.")
//             );
//     }
//
//
//     toggleDisplay() {
//         this.isLoggingIn = !this.isLoggingIn;
//     }
// }
