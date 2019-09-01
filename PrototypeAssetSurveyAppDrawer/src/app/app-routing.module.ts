import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { LoginComponent } from "../login/login.component";
import { HomeComponent } from "./home/home.component";
import { CreateNewComponent } from "./create/create.component";
import { UpdateDeleteComponent } from "./update/update.component";
import { ReportComponent } from "./report/report.component";

import { AuthGuard } from "./auth-guard.service";

export const routes: Routes = [
    { path: "", component: LoginComponent },
    // { path: "", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "home", component: HomeComponent },
    { path: "create", component: CreateNewComponent },
    { path: "update", component: UpdateDeleteComponent },
    { path: "report", component: ReportComponent }
];

export const navigatableComponents = [
    // LoginComponent,
    HomeComponent,
    CreateNewComponent,
    UpdateDeleteComponent,
    ReportComponent
];

export const authProviders = [
    AuthGuard
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
