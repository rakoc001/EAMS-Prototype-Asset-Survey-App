import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { User } from "../../shared/user.model";

const firebase = require ("nativescript-plugin-firebase");
import { firestore } from "nativescript-plugin-firebase";
const assetsCollection = firestore.collection("assets");

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
    user = new User();
    email = this.user.email;
    createdDate: string;
    changedDate: string;
    changedBy: string;

    currentDay: number = new Date().getDate();
    currentMonth: number = new Date().getMonth() + 1;
    currentYear: number = new Date().getFullYear();
    todaysDate = String(this.currentYear) + "-" + String(this.currentMonth) + "-" + String(this.currentDay);
    
    @ViewChild("assetIDTextField", { static: true }) assetIDTextField: ElementRef;
    assetId = String(this.assetIDTextField);

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

    constructor(private router: Router,
                private routerExtensions: RouterExtensions
              ) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }
    
    ngOnInit() {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
       firebase.getCurrentUser()
           .then((user) => { this.email = user.email; })
           .catch((error) => console.error("Error getting current user: " + error));
       
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

    submit() {
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

        console.log("Asset Id: " + this.assetId);
        console.log("Asset Condition: " + this.listPickerCondition[this.condition]);
        console.log("Asset Status: " + this.listPickerStatus[this.status]);
        console.log("Asset Created Date: " + this.todaysDate);
        console.log("Asset Changed Date: " + this.todaysDate);
        console.log("Asset Changed By: " + this.email);

        const assetDocument = assetsCollection.doc(this.assetId);
        assetDocument.set({
            asset_ID: this.assetId,
            asset_Condition: this.listPickerCondition[this.condition],
            asset_Status: this.listPickerStatus[this.status],
            asset_CreatedDate: this.todaysDate,
            asset_ChangedDate: this.todaysDate,
            asset_ChangedBy: this.email,
            asset_IsDeleted: "false"
        });

        console.log("Submit Button Pressed");
        alert("Asset Submitted");

  }
}
