import { Component, OnInit } from "@angular/core";
import { User } from "../shared/user/user.model"; // Need to configure to use kinvey/firebase email-password authentication
import { UserService } from "../shared/user/user.model"; // Need to configure to use kinvey/firebase email-password authentication
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";

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
