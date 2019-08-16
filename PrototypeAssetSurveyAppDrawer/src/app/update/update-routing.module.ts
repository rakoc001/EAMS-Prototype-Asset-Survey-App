import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { UpdateDeleteComponent } from "./update.component";

const routes: Routes = [
    { path: "", component: UpdateDeleteComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class UpdateRoutingModule { }
