import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { CreateRoutingModule } from "./create-routing.module";
import { CreateComponent } from "./create.component";

@NgModule({
    imports: [
        NativeScriptModule,
        CreateRoutingModule
    ],
    declarations: [
        CreateComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CreateModule { }
