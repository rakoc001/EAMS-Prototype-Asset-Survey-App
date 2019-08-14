import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";

import { TextField } from "tns-core-modules/ui/text-field";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { View } from "tns-core-modules/ui/core/view";

import { getString } from "tns-core-modules/application-settings";
import { alert, LoginService, User } from "../../shared";
import { Asset } from "./asset.model";
import { CreateNewComponent } from "../create/create.component";
import { DatabaseService } from "../../database/sqlite.service";


@Component({
    selector: "Assets",
    moduleId: module.id
})

export class AssetComponent/* implements OnInit */{
    id: string;
    condition: string;
    status: string;
    createdDate: string;
    changedDate: string;
    changedBy: string;
    db: any;
    user_id: string;

    constructor(private router: Router,
                private routerExtensions: RouterExtensions,
                private userService: LoginService,
                private database: DatabaseService,
                private asset: Asset
              ) { }
    //ngOninit(): void { }

    createNewAsset(asset: Asset) {
        if (this.id.trim() === "") {
            alert("Enter a valid AssetID");
            return;
        }

        if (this.condition === "Please select a condition...") {
            alert("Select a valid condition");
            return;
        }

        if (this.status === "Please select a status...") {
            alert("Select a valid status");
            return;
        }

        this.database.getdbConnection()
            .then(db => {
                db.execSQL("INSERT INTO Assets (AssetID, Condition, Status, CreatedDate, ChangedDate, ChangedBy) VALUES (?,?,?,?,?,?)", [this.id, this.condition, this.status, this.createdDate, this.changedDate, this.changedBy])
            })
    }
    updateDeleteAsset() {}
    createReport() {}

}
