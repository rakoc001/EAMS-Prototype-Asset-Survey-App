import { Component, OnInit } from "@angular/core";

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
export class CreateComponent implements OnInit {
    constructor() {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    }
}