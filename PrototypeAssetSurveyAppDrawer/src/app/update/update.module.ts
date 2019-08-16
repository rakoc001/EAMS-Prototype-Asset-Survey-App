import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { UpdateRoutingModule } from "./update-routing.module";
import { UpdateDeleteComponent } from "./update.component";

@NgModule({
    imports: [
        NativeScriptModule,
        UpdateRoutingModule
    ],
    declarations: [
        UpdateDeleteComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class UpdateModule { }
