import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransation } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";

const firebase = require("nativescript-plugin-firebase");

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit{
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: Router, private routerExtensions: RouterExtensions) {
        // User the component constructor to inject services.
    }

    ngOnInit(): void {
        this.activatedUrl = "/home"; // This may need to be /LoginComponent
        this._sideDrawerTransition = new SlideInOnTopTransation();

        firebase.init({
            // Optionally pass in properties for database, authentication and
            // cloud messaging, see their respective docs
        }).then(
            () => {
                console.log("firebase.init done");
            },
            error => {
              console.log(`firebase.init error: ${error}`);
            }
        );
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this.activatedUrl == url;
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
}
