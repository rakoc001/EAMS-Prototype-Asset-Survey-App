import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { ReportRoutingModule } from "./report-routing.module";
import { ReportComponent } from "./report.component";

@NgModule({
    imports: [
        NativeScriptModule,
        ReportRoutingModule
    ],
    declarations: [
        ReportComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ReportModule { }
