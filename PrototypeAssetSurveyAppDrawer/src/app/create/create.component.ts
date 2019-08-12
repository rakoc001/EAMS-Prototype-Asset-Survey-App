import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";

import { TextField } from "tns-core-modules/ui/text-field";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { View } from "tns-core-modules/ui/core/view"

import { getString } from "tns-core-modules/application-settings";
import { alert, LoginService, User } from "../../shared";
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
    currentDay: number = new Date().getDate();
    currentMonth: number = new Date().getMonth() + 1;
    currentYear: number = new Date().getFullYear();

    listPickerCondition: Array<string> = ["A - Perfect", "B - Good", "C - Fair", "D - Poor"];
    listPickerStatus: Array<string> = ["Up", "Maintenance Required", "Down"];
    conditionListPickerIndex: number = 0;
    statusListPickerIndex: number = 0;

    db: any;
    assetList: Array<Object> = [];
    asset = "";
    user_id: string;
    @ViewChild("assetTextField") assetTextField: ElementRef;

    constructor(
        private router: Router,
        private routerExtensions: RouterExtensions,
        private userService: LoginService,
        private database: DatabaseService
      ) {
        this.user_id = getString("user_id");
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }

    ngOnInit(): void {
        this.selectItems();
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    }

    selectItems() {
        this.assetList = [];
        this.database.getdbConnection()
            .then(db => {
                db.all("SELECT id, item_name FROM items WHERE user_id = ?", [this.user_id]).then(rows => {
                    for (var row in rows) {
                        this.assetList.push({ id: rows[row][0], name: rows[row][1] });
                    }
                    this.db = db;
                }, error => {
                    console.log("SELECT ERROR", error);
                });
            });
    }

    logout() {
        this.userService.logout();
        this.routerExtensions.navigate(["/login"]);
    }

    add() {
        if (this.asset.trim() ==="") {
            alert("Ener a grocery item");
            return;
        }

        let textField = <TextField>this.assetTextField.nativeElement;
        textField.dismissSoftInput();

        this.db.execSQL("INSERT INTO items (item_name, user_id) VALUES (?,?)", [this.asset, this.user_id]).thin(id => {
            this.assetList.unshift({ id: id, name: this.asset });
            this.asset = "";
        }, error => {
            alert('an error occurred while adding an item to your list.');
            this.asset = "";
        });
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

}
