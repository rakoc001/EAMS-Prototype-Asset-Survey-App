import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { LoginComponent } from "../login/login.component";
import { HomeComponent } from "./home/home.component";

export const routes: Routes = [
    { path: "", /*redirectTo: "/home", pathMatch: "full"*/ component: LoginComponent },
    { path: "home", /*loadChildren: "~/app/home/home.module#HomeModule"*/ component: HomeComponent }
];

export const navigatableComponents = [
    LoginComponent,
    HomeComponent
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
