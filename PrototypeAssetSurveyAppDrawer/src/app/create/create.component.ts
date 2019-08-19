import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";

import { DatabaseService } from "../../database/sqlite.service";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "create", loadChildren: "./create/create.module#CreateModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "Create",
    moduleId: module.id,
    templateUrl: "./create.component.html"
})
export class CreateNewComponent implements OnInit {
    createdDate: string;
    changedDate: string;
    changedBy: string;
    userID: string;

    currentDay: number = new Date().getDate();
    currentMonth: number = new Date().getMonth() + 1;
    currentYear: number = new Date().getFullYear();
    todaysDate = String(this.currentYear) + "-" + String(this.currentMonth) + "-" + String(this.currentDay);

    listPickerCondition: Array<string> = ["Please select a condition...",
                                          "A - Perfect",
                                          "B - Good",
                                          "C - Fair",
                                          "D - Poor"];
    listPickerStatus: Array<string> = ["Please select a status...",
                                       "Up",
                                       "Maintenance Required",
                                       "Down"];
    condition: number = 0;
    status: number = 0;
    @ViewChild("assetIDTextField", { static: true }) assetIDTextField: ElementRef;
    assetId = String(this.assetIDTextField);
    db: any;

    constructor(private router: Router,
                private routerExtensions: RouterExtensions,
                private database: DatabaseService
              ) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
        this.openDbConnection();
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    openDbConnection() {
        this.database.getdbConnection()
    }

    submit(): void {
        if (this.assetId === "") {
            alert("Enter a valid AssetId");
            return;
        }

        if (this.condition === 0) {
            alert("Select a valid Condition");
            return;
        }

        if (this.status === 0) {
            alert("Select a valid Status");
            return;
        }

        this.createdDate = this.todaysDate;
        this.changedDate = this.todaysDate;
        this.changedBy = this.userID;
        console.log("Asset Id: " + this.assetId);
        console.log("Asset Condition: " + this.listPickerCondition[this.condition]);
        console.log("Asset Status: " + this.listPickerStatus[this.status]);
        console.log("Asset Created Date: " + this.todaysDate);
        console.log("Asset Changed Date: " + this.todaysDate);
        console.log("Asset Changed By: " + this.changedBy);

        this.database.getdbConnection()
            .then(db => {
                db.execSQL("INSERT INTO assets (assetID, Condition, Status, CreatedDate, ChangedDate, ChangedBy) VALUES (?,?,?,?,?,?)", [this.assetId, this.listPickerCondition[this.condition],this.listPickerStatus[this.status], this.createdDate, this.changedDate, this.changedBy]);

        console.log("Submit Button Pressed");
        alert("Asset Submitted");
    });

  }
}
