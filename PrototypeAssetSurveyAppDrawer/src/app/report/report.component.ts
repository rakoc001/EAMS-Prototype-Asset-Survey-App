import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { User } from "../../shared/user.model";

// const firebase = require("nativescript-plugin-firebase");
import { firestore } from "nativescript-plugin-firebase";
const assetsCollection = firestore.collection("assets");

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "report", loadChildren: "./report/report.module#ReportModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/


@Component({
    selector: "Report",
    moduleId: module.id,
    templateUrl: "./report.component.html"
})
export class ReportComponent implements OnInit {
    user = new User();
    
    @ViewChild("assetIDTextField", { static: true }) assetIDTextField: ElementRef;
    assetId = String(this.assetIDTextField);

    asset: { asset_Id: string, asset_Condition: string, asset_Status: string, asset_CreatedDate: string, asset_ChangedDate: string, asset_ChangedBy: string, asset_isDeleted: boolean }[] = [
        
    ];

    
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
        console.log("Searching for asset Id: " + this.assetId);
        
        const assetDocument = assetsCollection.doc(this.assetId);
        
        assetDocument
            .get()
            .then(doc => console.log(JSON.stringify(doc.data())));
        // const assetDocument = assetsCollection.where("doc.id", "==", this.assetId);
        // assetDocument
        //     .get()
        //     .then(querySnapshot => {
        //         querySnapshot.forEach(doc => {
        //             console.log(`Output from query: ${doc.id} => ${JSON.stringify(doc.data())}`);
        //         });
        //     });
            

    }
}
