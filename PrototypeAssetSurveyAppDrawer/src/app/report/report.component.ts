import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";

const firebase = require("nativescript-plugin-firebase");
const assetsCollection = firebase.firestore().collection("assets");
import { firestore } from "nativescript-plugin-firebase";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "report", loadChildren: "./report/report.module#ReportModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

/*interface DataItem{
    asset_Id: string;
    asset_Condition: string;
    asset_Status: string;
    asset_CreatedDate: string;
    asset_ChangedDate: string;
    asset_ChangedBy: string;
    asset_isDeleted: boolean;
}*/

@Component({
    selector: "Report",
    moduleId: module.id,
    templateUrl: "./report.component.html"
})
export class ReportComponent implements OnInit {
    @ViewChild("assetIDTextField", { static: true }) assetIDTextField: ElementRef;
    assetId = String(this.assetIDTextField);
    
    constructor(private router: Router,
                private routerExtensions: RouterExtensions) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
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
        const assetDocument = assetsCollection.where("documentRef", "==", this.assetId);
        assetDocument
            .get()
            ; /*
        DataItem[] = [{ asset_Id: assetDocument.asset_ID,
                               asset_Condition: assetDocument.asset_Condition,
                               asset_Status: assetDocument.asset_Status,
                               asset_CreatedDate: assetDocument.asset_CreatedDate,
                               asset_ChangedDate: assetDocument.asset_ChangedDate,
                               asset_ChangedBy: assetDocument.asset_ChangedBy,
                               asset_isDeleted: assetDocument.asset_isDeleted }
            ];*/
    }

}
