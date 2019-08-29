import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";

const firebase = require("nativescript-plugin-firebase");

import { LoginService, User } from "../shared/";

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html",
    providers: [User]
})
export class AppComponent implements OnInit {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: Router,
                private routerExtensions: RouterExtensions,
                private userService: LoginService) {
        // Use the component constructor to inject services.
    }

    ngOnInit(): void {
        /*firebase.init({
            // Optionally pass in properties for database, authentication and cloud messaging,
            // see their respective docs
        }).then(
            () => {
              console.log("firebase.init done");
          } ,
            error => {
              console.log(`firebase.init error: ${error}`);
          }
        );
        const listener = {
            onAuthStateChanged(data) {
                console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
                if (data.loggedIn) {
                    console.log("User Info", data.user);
                }
            },
            thisArg: this
        };

        // add the listener:
        firebase.addAuthStateListener(listener);

        // stop listening to auth state changes:
        firebase.removeAuthStateListener(listener);

        // check of already listening to auth state changes
        firebase.hasAuthStateListener(listener);
*/
        this._activatedUrl = "/login";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);

    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    logout() {
        this.userService.logout();
        this.routerExtensions.navigate(["/login"]);

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
