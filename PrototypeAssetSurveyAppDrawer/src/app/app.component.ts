import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";

//const firebase = require("nativescript-plugin-firebase");
import { LoginService } from "../shared/login.service";
import { DatabaseService } from "../database/sqlite.service";

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: Router,
                private routerExtensions: RouterExtensions,
                private userService: LoginService,
                private database: DatabaseService) {
                    /*this.database.getdbConnection()
                        .then(db => {
                            db.execSQL("CREATE TABLE IF NOT EXISTS assets (ID INTEGER PRIMARY KEY AUTOINCREMENT, AssetID TEXT UNIQUE NOT NULL, Condition TEXT NOT NULL, Status TEXT NOT NULL, CreatedDate TEXT NOT NULL, ChangedDate TEXT NOT NULL, ChangedBy INTEGER NOT NULL CONSTRAINT fk_users FOREIGN KEY (ChangedBy) REFERENCES users(UserID))").then(() => {
                            }, error => {
                                console.log("CREATE TABLE ERROR", error);
                            });
                            db.execSQL("CREATE TABLE IF NOT EXISTS user (UserID INTEGER PRIMARY KEY AUTOINCREMENT, Email TEXT UNIQUE NOT NULL, Password TEXT NOT NULL)").then(() => {
                            }, error => {
                                console.log("CREATE TABLE ERROR", error);
                            });
                        });*/
        // Use the component constructor to inject services.
    }

    ngOnInit(): void {
        this._activatedUrl = "/login";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);

        /*firebase.init({
            // Optionally pass in properties for database, authentication and cloud messaging,
            // see their respective docs.
        }).then(
            () => {
                console.log("firebase.init done");
            },
            error => {
                console.log(`firebase.init error: ${error}`);
            }
        );*/
        this.database.getdbConnection()
            .then(db => {
                db.execSQL("CREATE TABLE IF NOT EXISTS assets (ID INTEGER PRIMARY KEY AUTOINCREMENT, AssetID TEXT UNIQUE NOT NULL, Condition TEXT NOT NULL, Status TEXT NOT NULL, CreatedDate TEXT NOT NULL, ChangedDate TEXT NOT NULL, ChangedBy INTEGER NOT NULL CONSTRAINT fk_users FOREIGN KEY (ChangedBy) REFERENCES users(UserID))").then(() => {
                }, error => {
                    console.log("CREATE TABLE ERROR", error);
                });
                db.execSQL("CREATE TABLE IF NOT EXISTS user (UserID INTEGER PRIMARY KEY AUTOINCREMENT, Email TEXT UNIQUE NOT NULL, Password TEXT NOT NULL)").then(() => {
                }, error => {
                    console.log("CREATE TABLE ERROR", error);
                });
            });
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
    }
}
