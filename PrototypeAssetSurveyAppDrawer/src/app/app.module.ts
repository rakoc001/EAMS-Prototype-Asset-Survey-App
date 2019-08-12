import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { AppRoutingModule, authProviders, routes, navigatableComponents } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { LoginModule } from "../login/login.module";
import { setStatusBarColors, BackendService, LoginService } from "../shared";
import { DatabaseService } from "../database/sqlite.service";

setStatusBarColors();


@NgModule({
    providers: [
        authProviders,
        BackendService,
        LoginService,
        DatabaseService
    ],
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(routes),
        NativeScriptUIListViewModule,
        LoginModule
    ],
    declarations: [
        AppComponent,
        ...navigatableComponents
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
