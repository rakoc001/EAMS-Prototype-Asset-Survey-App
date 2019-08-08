import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    data = [];

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.data.push({ text: "Create New Entry"/*, src: "../../images/plus.svg" */});
        this.data.push({ text: "Update/Delete Existing Asset"/*, src: "../../images/database.svg" */});
        this.data.push({ text: "Create/View Asset Report"/*, src: "../../images/list-alt.svg" */});
        this.data.push({ text: "Search by AssetID"/*, src: "../../images/search.svg" */});
    }

    onItemTap(args) {
        console.log("You Tapped: " + this.data[args.index].text);
    }

//    createEntry() {
//        console.log("New Asset button pressed");
//    }
//
//    updateEntry() {
//        console.log("Update Asset button pressed");
//    }
//
//    reports() {
//        console.log("Create Reports button pressed");
//    }
//
//    search() {
//        console.log("Search button pressed");
//    }
//
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
