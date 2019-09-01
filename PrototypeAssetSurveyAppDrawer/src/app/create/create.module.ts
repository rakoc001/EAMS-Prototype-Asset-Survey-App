import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { CreateRoutingModule } from "./create-routing.module";
import { CreateNewComponent } from "./create.component";

@NgModule({
    imports: [
        NativeScriptModule,
        CreateRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        CreateNewComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CreateModule { }
