import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

//import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

//import { LoginRoutingModule } from "./login-routing.module";
import { loginRouting } from "./login/routing"
import { LoginComponent } from "./login.component";

@NgModule({
    imports: [
        //NativeScriptModule,
        //LoginRoutingModule
        NativeScriptFormsModule,
        NativeScriptCommonModule,
        loginRouting
    ],
    declarations: [
        LoginComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LoginModule { }
